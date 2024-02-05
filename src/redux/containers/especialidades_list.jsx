import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEspecialidades } from '../../redux/actions/especialidadesActions';
import Especialidades from '../../especialidades/pages/GetEspecialidades'
import { AuthContext } from '../../context/auth-context';

const EspecialidadesContainer = () => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const { especialidades, isLoading } = useSelector(
    (state) => state.especialidades
  );

  useEffect(() => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/especialidades`;
    dispatch(fetchEspecialidades(url, auth.token));
  }, [dispatch, auth.token]);

  return <Especialidades isLoading={isLoading} especialidades={especialidades} />;
};

export default EspecialidadesContainer;