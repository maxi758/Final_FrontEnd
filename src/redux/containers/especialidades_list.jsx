import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEspecialidades } from '../../redux/actions/especialidadesActions';
import Especialidades from '../../especialidades/pages/GetEspecialidades'

const EspecialidadesContainer = () => {
  const dispatch = useDispatch();
  const { token} = useSelector((state) => state.auth);
  const { especialidades, isLoading } = useSelector(
    (state) => state.especialidades
  );

  useEffect(() => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/especialidades`;
    dispatch(fetchEspecialidades(url, token));
  }, [dispatch, token]);

  return <Especialidades isLoading={isLoading} especialidades={especialidades} />;
};

export default EspecialidadesContainer;