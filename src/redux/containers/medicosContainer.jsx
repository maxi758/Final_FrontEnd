import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import {
  getMedicos,
  createMedico,
  updateMedico,
  getMedicoById,
} from '../reducers/medicosReducer';
import Medicos from '../../medicos/pages/GetMedicos';
import NewMedico from '../../medicos/pages/NewMedico';
import UpdateMedico from '../../medicos/pages/UpdateMedico';

const MedicosContainer = () => {
  const dispatch = useDispatch();
  const { medicos, isLoading } = useSelector((state) => state.medicos);
  const { token } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      dispatch(getMedicos(token));
    } catch (err) {
      setError(err);
      console.log('error: ', err);
    }
  }, [dispatch]);

  const createMedicoHandler = (
    nombre,
    apellido,
    matricula,
    especialidad,
    token
  ) => {
    dispatch(
      createMedico({
        formData: { nombre, apellido, matricula, especialidad },
        token,
      })
    );
    navigate('/medicos');
  };

  const findOneMedicoHandler = (id, token) => {
    dispatch(getMedicoById({ data: { id, token } }));
  };

  const updateMedicoHandler = (
    id,
    nombre,
    apellido,
    matricula,
    especialidad,
    token
  ) => {
    dispatch(
      updateMedico({
        formData: { id, nombre, apellido, matricula, especialidad },
        token,
      })
    );
    navigate('/medicos');
  };

  return (
    <Routes>
      <Route
        path="new"
        element={<NewMedico onCreateMedico={createMedicoHandler} />}
      />
      <Route
        path=":id"
        element={
          <UpdateMedico
            onUpdateMedico={updateMedicoHandler}
            onFindOneMedico={findOneMedicoHandler}
          />
        }
      />
      <Route
        path=""
        element={
          <Medicos isLoading={isLoading} medicos={medicos} error={error} />
        }
      />
      <Route path="*" element={<Navigate to="/medicos" />} />
    </Routes>
  );
};

export default MedicosContainer;
