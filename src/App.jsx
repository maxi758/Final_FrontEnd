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
//const EditMedico = React.lazy(() => import('./medicos/pages/UpdateMedico'));
const Auth = React.lazy(() => import('./usuarios/pages/Auth'));

const App = () => {
  const { token, login, logout, userId, rol } = useAuth();
  let routes;
  console.log('token: ', token);
  if (!token) {
    routes = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  } else {
    
    console.log('userId: ', userId);
    console.log('rol: ', rol);
    routes = (
      <Routes>
        <Route path="/especialidades" element={<Especialidades />} />
        <Route path="/medicos" element={<Medicos />} />
        <Route path="/medicos/new" element={<NewMedico />} />
        {/* <Route path="/medicos/:id" element={<EditMedico />} /> */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Navigate to="/medicos" />} />
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
