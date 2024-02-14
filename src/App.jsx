import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { CircularProgress } from '@mui/material';

// const Especialidades = React.lazy(() =>
//   import('./especialidades/pages/GetEspecialidades')
// );
const Especialidades = React.lazy(() =>
  import('./redux/containers/especialidades_list')
);
const Medicos = React.lazy(() => import('./redux/containers/medicosContainer'));
//const Medicos = React.lazy(() => import('./medicos/pages/GetMedicos'));
//const NewMedico = React.lazy(() => import('./medicos/pages/NewMedico'));
//const EditMedico = React.lazy(() => import('./medicos/pages/UpdateMedico'));
//const Auth = React.lazy(() => import('./usuarios/pages/Auth'));
const Auth = React.lazy(() => import('./redux/containers/authContainer'));
//const Recover = React.lazy(() => import('./usuarios/pages/updateUser'));
//const Turnos = React.lazy(() => import('./turnos/pages/GetTurnos'));
const Turnos = React.lazy(() => import('./redux/containers/turnosContainer'));
//const NewTurno = React.lazy(() => import('./turnos/pages/NewTurno'));
const UpdateTurno = React.lazy(() => import('./turnos/pages/UpdateTurno'));
const MyTurnos = React.lazy(() => import('./turnos/pages/GetTurnosUsuario'));
const TurnosMedico = React.lazy(() => import('./turnos/pages/GetTurnosMedico'));

import './App.css';

const App = () => {
  const { isLoggedIn, userId, token, rol } = useSelector((state) => state.auth);
  let routes;
  console.log('token: ', token);
  if (!isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        {/* <Route path="/auth/recover" element={<Recover />} />
        <Route path="/auth/recover:key" element={<Recover />} /> */}
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  } else {
    console.log('userId: ', userId);
    console.log('rol: ', rol);
    routes = (
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        {/* <Route path="/recover" element={<Recover />} /> */}
        <Route path="/turnos/*" element={<Turnos />} />
        {/* <Route path="/turnos/new" element={<NewTurno />} /> */}
        {/* <Route path="/turnos/:id" element={<UpdateTurno />} />
        <Route path="/turnos/me" element={<MyTurnos />} />
        <Route path="/turnos/me/cancelados" element={<MyTurnos />} />
        <Route path="/turnos/medicos/:id" element={<TurnosMedico />} /> */}
        <Route path="/especialidades" element={<Especialidades />} />
        <Route path="/medicos/*" element={<Medicos />} />
        {/* <Route path="/medicos/new" element={<NewMedico />} />
        <Route path="/medicos/:id" element={<EditMedico />} /> */}
        <Route path="/" element={<Navigate to="/medicos" />} />
        <Route path="*" element={<Navigate to="/especialidades" />} />
      </Routes>
    );
  }

  return (
      <Router>
        <MainNavigation />
        <main>
          <React.Suspense
            fallback={
              <div className="center">
                <CircularProgress />
              </div>
            }
          >
            {routes}
          </React.Suspense>
        </main>
      </Router>
  );
};

export default App;
