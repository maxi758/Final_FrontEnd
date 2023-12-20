import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { CircularProgress } from '@mui/material';

const Especialidades = React.lazy(() => import('./especialidades/pages/GetEspecialidades'));
// const Medicos = React.lazy(() => import('./medicos/pages/GetMedicos'));

const App = () => {
  return (
    <React.Suspense fallback={<CircularProgress />}>
      <Router>
        <Routes>
          <Route path="/especialidades" element={<Especialidades />} />
          {/* <Route path="/medicos/:medicoId" element={<Medicos />} /> */}
          <Route path="/" element={<Navigate to="/especialidades" />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};

export default App;