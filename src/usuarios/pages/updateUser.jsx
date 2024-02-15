import React, { useState, useEffect } from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Card, Button, CircularProgress } from '@mui/material';
import Input from '../components/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../util/validators';
import { useForm } from '../../hooks/form-hook';

import './Auth.css';
import { useSelector } from 'react-redux';
import { clearError } from '../../redux/reducers/authReducer';

const UpdateUser = ({ error, onLogin, onAccountRecovery, onResetPassword }) => {
  const navigate = useNavigate();
  const { token, isLoggedIn, isLoading } = useSelector((state) => state.auth);
  //const key = useParams().key || null;
  const [searchParams, setSearchParams] = useSearchParams();
  console.log('key: ', searchParams.get('key'));
  const key = searchParams.get('key') || null;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log('isAuthenticated: ', isAuthenticated);
  useEffect(() => {
    console.log('token: ', token);
    if (key) {
      setIsAuthenticated(true);
      console.log('isAuthenticated: ', isAuthenticated);
    } else {
      setIsAuthenticated(false);
      console.log('isAuthenticated: ', isAuthenticated);
    }
  }, [key]);
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
    //navigate('/auth');
    //setIsAuthenticated((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      try {
        console.log(
          'formState.inputs.recoverEmail.value: ',
          formState.inputs.recoverEmail.value
        );
        onAccountRecovery(formState.inputs.recoverEmail.value);
        navigate('/auth');
        //setIsAuthenticated(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        console.log('aqui');
        onResetPassword(
          key,
          formState.inputs.recoverEmail.value,
          formState.inputs.password.value,
          formState.inputs.repeatPassword.value
        );
        //setIsAuthenticated(true);
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
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <Card className="authentication">
        {isLoading && <CircularProgress />}
        <h2>
          {isAuthenticated ? 'ACTUALIZAR CONTRASEÑA' : 'RECUPERAR CONTRASEÑA'}
        </h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoggedIn && (
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
              {!isLoggedIn && (
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
                  readOnly={true}
                  disabled={true}
                />
              )}
            </div>
          )}
          <Button
            type="submit"
            disabled={!formState.isValid}
            onClick={switchModeHandler}
          >
            {isLoggedIn ? 'ACTUALIZAR' : 'RECUPERAR'}
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default UpdateUser;
