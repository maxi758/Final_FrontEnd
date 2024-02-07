import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicos } from '../reducers/medicosReducer';
import Medicos from '../../medicos/pages/GetMedicos';

const MedicosContainer = () => {
  const dispatch = useDispatch();
  const { medicos, isLoading } = useSelector((state) => state.medicos);
  const { token } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      dispatch(getMedicos(token));
    } catch (err) {
      setError(err);
      console.log('error: ', err);
    }
  }, [dispatch]);

  return <Medicos isLoading={isLoading} medicos={medicos} error={error} />;
};

export default MedicosContainer;
