import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'; // NavLink is a special version of the <Link> component that will add styling attributes to the rendered element when it matches the current URL.
import BasicMenu from './menu';
import { AuthContext } from '../../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
          <NavLink to="/recover">Cuenta</NavLink>
        </li>
      {auth.rol === 'ADMIN' && (
        <li>
          <NavLink to="/auth">Usuarios</NavLink>
        </li>
      )}
      {auth.rol === 'PACIENTE' && (
        <li>
          <NavLink to="/">Medicos</NavLink>
        </li>
      )}
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/especialidades`}>Especialidades</NavLink>
        </li>
      )} */}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/especialidades`}>Especialidades</NavLink>
        </li>
      )}
      {auth.rol === 'ADMIN' && (
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
      {auth.rol === 'ADMIN' && (
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
      {auth.rol === 'PACIENTE' && (
        <li>
          <BasicMenu
            buttonLabel={'Turnos'}
            options={[
              {
                label: 'Mis Turnos',
                to: '/turnos/me',
              },
              {
                label: 'Listado de Turnos',
                to: '/turnos',
              },

            ]}
          />
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
