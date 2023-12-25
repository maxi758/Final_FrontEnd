import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
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
import { AuthContext } from '../../context/auth-context';

import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); //
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
    try {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/usuarios/admin`,
        'POST',
        JSON.stringify({
          nombre: formState.inputs.nombre.value,
          apellido: formState.inputs.apellido.value,
          dni: formState.inputs.dni.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      console.log(responseData);
      //auth.login(responseData.userId, responseData.token);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
    }
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/usuarios/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        console.log(responseData);
        if (!responseData.usuario) throw new Error(responseData.message);

        auth.login(
          responseData.usuario._id,
          responseData.token,
          responseData.usuario.rol
        );
        setIsAuthenticated(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const formData = new FormData(); // FormData es una clase de js que nos permite crear un objeto con clave-valor, donde la clave es el nombre del input y el valor es el archivo
        formData.append('nombre', formState.inputs.nombre.value);
        formData.append('apellido', formState.inputs.apellido.value);
        formData.append('dni', formState.inputs.dni.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);

        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/usuarios`,
          'POST',
          JSON.stringify({
            nombre: formState.inputs.nombre.value,
            apellido: formState.inputs.apellido.value,
            dni: formState.inputs.dni.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        console.log(responseData);
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const errorHandler = () => {
    // se puede agregar clearError a errorModal
    clearError();
  };

  if (error) {
    console.log(error);
    return (
      <ErrorModal error={error.message} code={error.errorCode}  onClear={clearError} />
    );
  }
  return (
    (
      <React.Fragment>
        {isAuthenticated && <Navigate to="/" />}
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
            {!isLoginMode && auth.rol ==='ADMIN' && (
              <Button type="submit" onClick={createAdminHandler} disabled={!formState.isValid}>
                CREATE ADMIN
              </Button>
            )}
          </form>
          <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
          </Button>
        </Card>
      </React.Fragment>
    )
  );
};

export default Auth;
