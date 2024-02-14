import React, { useState, useContext, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Card, Button, CircularProgress } from '@mui/material';
import Input from '../components/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../util/validators';
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';

import './Auth.css';
import { useSelector } from 'react-redux';

const UpdateUser = ({onLogin, onAccountRecovery}) => {
  const {token, isLoggedIn, isLoading} = useSelector((state) => state.auth);
  const key = useParams().key || null;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { error, sendRequest, clearError } = useHttpClient();
	useEffect(() => {
		if (token) {
			setIsAuthenticated(true);
		}
		else {
			setIsAuthenticated(false);
		}
	}, [token]);
  const [formState, inputHandler, setFormData] = useForm(
    {
      recoverEmail: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (isAuthenticated) {
      setFormData(
        {
          ...formState.inputs,
          nombre: undefined,
        },
        formState.inputs.recoverEmail.isValid &&
          formState.inputs.password.isValid &&
          formState.inputs.repeatPassword.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          nombre: {
            value: '',
            isValid: false,
          },
        },
        formState.inputs.recoverEmail.isValid
      );
    }
    setIsAuthenticated((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      try {
        onAccountRecovery(formState.inputs.recoverEmail.value);
        setIsAuthenticated(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const responseData = await sendRequest(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_URL
          }/usuarios/reset-password`,
          'PATCH',
          JSON.stringify({
            key: key,
            email: formState.inputs.recoverEmail.value,
            password: formState.inputs.password.value,
            repeatPassword: formState.inputs.repeatPassword.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        setIsAuthenticated(true);
        //onLogin(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  if (error) {
    console.log(error);
    return (
      <ErrorModal
        error={error.message}
        code={error.errorCode}
        onClear={clearError}
      />
    );
  }

  return (
    (
      <React.Fragment>
        {/* <ErrorModal error={error} onClear={clearError} /> */}
        <Card className="authentication">
          {isLoading && <CircularProgress />}
          <h2>
            {isAuthenticated ? 'ACTUALIZAR CONTRASEÑA' : 'RECUPERAR CONTRASEÑA'}
          </h2>
          <hr />
          <form onSubmit={authSubmitHandler}>
						{!auth.isLoggedIn && (
            <Input
              id="recoverEmail"
              element="input"
              type="email"
              label="email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
						)}
            {isAuthenticated && (
              <div>
                <Input
                  id="password"
                  element="input"
                  type="password"
                  label="password"
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  errorText="Please enter a valid password, at least 5 characters."
                  onInput={inputHandler}
                />
                <Input
                  id="repeatPassword"
                  element="input"
                  type="password"
                  label="repeat password"
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  errorText="Please enter a valid password, at least 5 characters."
                  onInput={inputHandler}
                />
								{!auth.isLoggedIn && (
                <Input
                  id="key"
                  element="input"
                  type="text"
                  label="key"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid key."
                  onInput={inputHandler}
                  initialValue={key}
                  initialValid={true}
                />
								)}
              </div>
            )}
            <Button
              type="submit"
              disabled={!formState.isValid}
              onClick={switchModeHandler}
            >
              {isAuthenticated ? 'ACTUALIZAR' : 'RECUPERAR'}
            </Button>
          </form>
        </Card>
      </React.Fragment>
    )
  );
};

export default UpdateUser;
