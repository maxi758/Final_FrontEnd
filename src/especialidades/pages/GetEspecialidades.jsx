import React, { useEffect, useContext } from 'react';
import { CircularProgress } from '@mui/material';
import EspecialidadList from '../components/EspecialidadList';
import { AuthContext } from '../../context/auth-context';
import { fetchEspecialidades } from '../../redux/actions/especialidadesActions';
import { useDispatch, useSelector } from 'react-redux';

const Especialidades = () => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const { especialidades, isLoading } = useSelector(
    (state) => state.especialidades
  );

  useEffect(() => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/especialidades`;
    dispatch(fetchEspecialidades(url, auth.token));
  }, [dispatch, auth.token]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
      {!isLoading && especialidades && (
        <EspecialidadList items={especialidades} />
      )}
    </React.Fragment>
  );
};

export default Especialidades;
