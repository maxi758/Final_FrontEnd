import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTurno, getTurnos } from '../reducers/turnosReducer';
//const Turnos = React.lazy(() => import('../../turnos/pages/GetTurnos'));
import Turnos from '../../turnos/pages/GetTurnos';
import { getMedicos } from '../reducers/medicosReducer';
const NewTurno = React.lazy(() => import('../../turnos/pages/NewTurno'));
// const UpdateTurno = React.lazy(() => import('../../turnos/pages/UpdateTurno'));
// const MyTurnos = React.lazy(() =>
//   import('../../turnos/pages/GetTurnosUsuario')
// );
// const TurnosMedico = React.lazy(() =>
//   import('../../turnos/pages/GetTurnosMedico')
// );

const TurnosContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { turnos, isLoading } = useSelector((state) => state.turnos);
  const { token } = useSelector((state) => state.auth);
  const { medicos } = useSelector((state) => state.medicos);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!medicos) {
        dispatch(getMedicos(token));
      }
      dispatch(getTurnos(token));
    } catch (err) {
      setError(err);
      console.log('error: ', err);
    }
  }, [dispatch]);

  const createTurnoHandler = (fecha, observaciones, medico, token) => {
    dispatch(
      createTurno({
        formData: { fecha, observaciones, medico },
        token,
      })
    );
    navigate('/turnos');
  };

  return (
    <Routes>
      <Route
        path="new"
        element={<NewTurno onCreateTurno={createTurnoHandler} />}
      />
      {/* <Route path=":id" element={<UpdateTurno />} />
      <Route path="me" element={<MyTurnos />} />
      <Route path="me/cancelados" element={<MyTurnos />} />
      <Route path="medicos/:id" element={<TurnosMedico />} /> */}
      <Route
        path=""
        element={<Turnos turnos={turnos} isLoading={isLoading} error={error} />}
      />
    </Routes>
  );
};

export default TurnosContainer;
