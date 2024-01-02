import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { CircularProgress } from '@mui/material';

const Especialidades = React.lazy(() =>
  import('./especialidades/pages/GetEspecialidades')
);
const Medicos = React.lazy(() => import('./medicos/pages/GetMedicos'));
const NewMedico = React.lazy(() => import('./medicos/pages/NewMedico'));
const EditMedico = React.lazy(() => import('./medicos/pages/UpdateMedico'));
const Auth = React.lazy(() => import('./usuarios/pages/Auth'));
const Recover = React.lazy(() => import('./usuarios/pages/updateUser'));
const Turnos = React.lazy(() => import('./turnos/pages/GetTurnos'));
const NewTurno = React.lazy(() => import('./turnos/pages/NewTurno'));
const UpdateTurno = React.lazy(() => import('./turnos/pages/UpdateTurno'));
const MyTurnos = React.lazy(() => import('./turnos/pages/GetTurnosUsuario'));
const TurnosMedico = React.lazy(() => import('./turnos/pages/GetTurnosMedico'));

const App = () => {
  const { token, login, logout, userId, rol } = useAuth();
  let routes;
  console.log('token: ', token);
  if (!token) {
    routes = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/recover:key" element={<Recover />} />
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  } else {
    
    console.log('userId: ', userId);
    console.log('rol: ', rol);
    routes = (
      <Routes>
        <Route path="/recover" element={<Recover />} />
        <Route path='/turnos' element={<Turnos />} />
        <Route path='/turnos/new' element={<NewTurno />} />
        <Route path='/turnos/:id' element={<UpdateTurno />} />
        <Route path='/turnos/me' element={<MyTurnos />} />
        <Route path='/turnos/me/cancelados' element={<MyTurnos />} />
        <Route path='/turnos/medicos/:id' element={<TurnosMedico />} />
        <Route path="/especialidades" element={<Especialidades />} />
        <Route path="/medicos" element={<Medicos />} />
        <Route path="/medicos/new" element={<NewMedico />} />
        <Route path="/medicos/:id" element={<EditMedico />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Navigate to="/medicos" />} />
        <Route path="*" element={<Navigate to="/medicos" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        rol: rol,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <React.Suspense fallback={<div className="center"><CircularProgress /></div>}>
            {routes}
          </React.Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
