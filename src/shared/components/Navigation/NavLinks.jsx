import React from 'react';
import { NavLink } from 'react-router-dom'; // NavLink is a special version of the <Link> component that will add styling attributes to the rendered element when it matches the current URL.
import BasicMenu from './menu';
import store  from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/authReducer';
import './NavLinks.css';

const NavLinks = (props) => {
  const {isLoggedIn, rol  } = store.getState().auth;
  const dispatch = useDispatch();
  console.log('isLoggedIn: ', isLoggedIn);
  console.log('rol: ', rol);
  return (
    <ul className="nav-links">
      <li>
          <NavLink to="/recover">Cuenta</NavLink>
        </li>
      {rol === 'ADMIN' && (
        <li>
          <NavLink to="/auth">Usuarios</NavLink>
        </li>
      )}
      {rol === 'PACIENTE' && (
        <li>
          <NavLink to="/">Medicos</NavLink>
        </li>
      )}
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/especialidades`}>Especialidades</NavLink>
        </li>
      )} */}
      {isLoggedIn && (
        <li>
          <NavLink to={`/especialidades`}>Especialidades</NavLink>
        </li>
      )}
      {rol === 'ADMIN' && (
        <li>
          <BasicMenu
            buttonLabel={'Medicos'}
            options={[
              {
                label: 'Nuevo Medico',
                to: '/medicos/new',
              },
              {
                label: 'Listado de Medicos',
                to: '/medicos',
              },

            ]}
          />
        </li>
      )}
      {rol === 'ADMIN' && (
        <li>
          <BasicMenu
            buttonLabel={'Turnos'}
            options={[
              {
                label: 'Nuevo Turno',
                to: '/turnos/new',
              },
              {
                label: 'Listado de Turnos',
                to: '/turnos',
              },

            ]}
          />
        </li>
      )}
      {rol === 'PACIENTE' && (
        <li>
          <BasicMenu
            buttonLabel={'Turnos'}
            options={[
              {
                label: 'Mis Turnos',
                to: '/turnos/me',
              },
              {
                label: 'Turnos Cancelados',
                to: '/turnos/me/cancelados',
              },
              {
                label: 'Listado de Turnos',
                to: '/turnos',
              },

            ]}
          />
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button onClick={ () => dispatch(logout)}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
