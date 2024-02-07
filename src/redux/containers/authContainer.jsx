import React from 'react';
import Auth from '../../usuarios/pages/Auth';
import { useDispatch } from 'react-redux';
import { login, register, createAdmin } from '../reducers/authReducer';
import { useNavigate } from 'react-router-dom';

const AuthContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginHandler = (email, password) => {
    try {
      dispatch(
        login({
          email,
          password,
        })
      ).then((action) => {
        const remainingTime = 60 * 60 * 1000; // 1 hora
        const expiryDate = new Date(new Date().getTime() + remainingTime); // fecha actual + 1 hora
        localStorage.setItem(
          'userData',
          JSON.stringify({
            userId: action.payload.usuario._id,
            token: action.payload.token,
            rol: action.payload.usuario.rol,
            expiration: expiryDate.toISOString(),
          })
        );
        navigate('/');
      });
    } catch (err) {
      console.log(err);
    }
  };

  const registerHandler = (nombre, apellido, dni, email, password) => {
    try {
      dispatch(
        register({
          nombre,
          apellido,
          dni,
          email,
          password,
        })
      ).then((action) => {
        const remainingTime = 60 * 60 * 1000; // 1 hora
        const expiryDate = new Date(new Date().getTime() + remainingTime); // fecha actual + 1 hora
        localStorage.setItem(
          'userData',
          JSON.stringify({
            userId: action.payload._id,
            token: action.payload.token,
            rol: action.payload.rol,
            expiration: expiryDate.toISOString(),
          })
        );
        navigate('/');
      });
    } catch (err) {
      console.log(err);
    }
  };

	const createAdminHandler = (nombre, apellido, dni, email, password) => {
    try {
      dispatch(
        createAdmin({
          nombre,
          apellido,
          dni,
          email,
          password,
        })
      ).then((action) => {
        const remainingTime = 60 * 60 * 1000; // 1 hora
        const expiryDate = new Date(new Date().getTime() + remainingTime); // fecha actual + 1 hora
        localStorage.setItem(
          'userData',
          JSON.stringify({
            userId: action.payload._id,
            token: action.payload.token,
            rol: action.payload.rol,
            expiration: expiryDate.toISOString(),
          })
        );
        navigate('/');
      });
    } catch (err) {
      console.log(err);
    }
  };

  return <Auth onLogin={loginHandler} onRegister={registerHandler} onCreateAdmin={createAdminHandler} />;
};

export default AuthContainer;
