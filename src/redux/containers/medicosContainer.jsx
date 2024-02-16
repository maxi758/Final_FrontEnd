import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import {
  getMedicos,
  createMedico,
  updateMedico,
  getMedicoById,
} from '../reducers/medicosReducer';
import { fetchEspecialidades } from '../actions/especialidadesActions';
import Medicos from '../../medicos/pages/GetMedicos';
import NewMedico from '../../medicos/pages/NewMedico';
import UpdateMedico from '../../medicos/pages/UpdateMedico';

const MedicosContainer = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { especialidades } = useSelector((state) => state.especialidades);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!especialidades) {
        const url = `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }/especialidades`;
        dispatch(fetchEspecialidades(url, token));
      }

      dispatch(getMedicos(token));
    } catch (err) {
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
    ).then(() => {
      navigate('/medicos');
    });
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
    //navigate('/medicos');
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
      <Route path="" element={<Medicos />} />
      <Route path="*" element={<Navigate to="/medicos" />} />
    </Routes>
  );
};

export default MedicosContainer;
