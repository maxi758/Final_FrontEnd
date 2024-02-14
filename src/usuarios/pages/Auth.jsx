import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { useSelector } from 'react-redux';

import './Auth.css';

const Auth = ({ onLogin, onRegister, onCreateAdmin }) => {
  const { token, rol } = useSelector((state) => state.auth);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient(); // falta adaptar a redux

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          nombre: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
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
        formState.inputs.email.isValid &&
          formState.inputs.password.isValid &&
          formState.inputs.nombre.isValid &&
          formState.inputs.apellido.isValid &&
          formState.inputs.dni.isValid
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const createAdminHandler = async (event) => {
    event.preventDefault();

    onCreateAdmin(
      formState.inputs.nombre.value,
      formState.inputs.apellido.value,
      formState.inputs.dni.value,
      formState.inputs.email.value,
      formState.inputs.password.value
    );
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      onLogin(formState.inputs.email.value, formState.inputs.password.value);
    } else {
      onRegister(
        formState.inputs.nombre.value,
        formState.inputs.apellido.value,
        formState.inputs.dni.value,
        formState.inputs.email.value,
        formState.inputs.password.value
      );
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
      {/* <ErrorModal error={error.message} onClear={errorHandler} /> */}
      <Card className="authentication">
        {isLoading && <CircularProgress asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="nombre"
              type="text"
              label="Nombre"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Ingrese su nombre"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="apellido"
              type="text"
              label="Apellido"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Ingrese su apellido"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="dni"
              type="text"
              label="dni"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Ingrese su dni"
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Ingrese un email válido"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Ingrese una contraseña válida de al menos 5 caracteres"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
          {!isLoginMode && rol === 'ADMIN' && (
            <Button
              type="submit"
              onClick={createAdminHandler}
              disabled={!formState.isValid}
            >
              CREATE ADMIN
            </Button>
          )}
        </form>
        <Button inverse onClick={switchModeHandler}>
          CAMBIAR A {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
        <hr />
        <Link to="/auth/recover-password">
          <Button>RECUPERAR CONTRASEÑA</Button>
        </Link>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
