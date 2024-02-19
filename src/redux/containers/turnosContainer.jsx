import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTurno,
  getTurnos,
  updateTurno,
  getTurnoById,
  getTurnoByUsuario,
  getTurnoByMedico,
  asignTurno,
  cancelTurno,
  deleteTurno,
  selectAllTurnos,
  clearError,
} from '../reducers/turnosReducer';
import { getMedicos } from '../reducers/medicosReducer';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
const Turnos = React.lazy(() => import('../../turnos/pages/GetTurnos'));
const NewTurno = React.lazy(() => import('../../turnos/pages/NewTurno'));
const UpdateTurno = React.lazy(() => import('../../turnos/pages/UpdateTurno'));
const MyTurnos = React.lazy(() =>
  import('../../turnos/pages/GetTurnosUsuario')
);
const TurnosMedico = React.lazy(() =>
  import('../../turnos/pages/GetTurnosMedico')
);

const TurnosContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { turnosDisponibles, isLoading } = useSelector((state) => state.turnos);
  const { token } = useSelector((state) => state.auth);
  const { medicos } = useSelector((state) => state.medicos);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!medicos) {
        dispatch(getMedicos());
      }
      dispatch(getTurnos());
    } catch (err) {
      setError(err);
      console.log('error: ', err);
    }
  }, [dispatch, token]);

  const findOneTurnoHandler = (id, token) => {
    dispatch(getTurnoById({ data: { id, token } }));
  };

  const getTurnosByUsuarioHandler = (estado) => {
    dispatch(getTurnoByUsuario(estado));
  };

  const getTurnosByMedicoHandler = (id) => {
    dispatch(getTurnoByMedico(id));
  };

  const createTurnoHandler = (fecha, observaciones, medico, token) => {
    dispatch(
      createTurno({
        formData: { fecha, observaciones, medico },
        token,
      })
    ).then(() => {
      navigate('/turnos');
    });
  };

  const updateTurnoHandler = (id, observaciones, token) => {
    dispatch(
      updateTurno({
        formData: { id, observaciones },
        token,
      })
    ).then(() => {
      dispatch(getTurnos());
    });
    navigate('/turnos');
  };

  const asignTurnoHandler = (id) => {
    dispatch(asignTurno(id));
  };

  const cancelTurnoHandler = (id) => {
    dispatch(cancelTurno(id));
  };

  const deleteTurnoHandler = (id) => {
    console.log('id: ', id);
    dispatch(deleteTurno(id)).then(() => {
      dispatch(getTurnos());
    });
  };

  if (error) {
    console.log(error);
    return (
      <ErrorModal
        error={error.message}
        code={error.errorCode}
        onClear={dispatch(clearError())}
      />
    );
  }

  return (
    <Routes>
      <Route
        path="new"
        element={<NewTurno onCreateTurno={createTurnoHandler} />}
      />
      <Route
        path=":id"
        element={
          <UpdateTurno
            onUpdateTurno={updateTurnoHandler}
            onFindOneTurno={findOneTurnoHandler}
          />
        }
      />
      <Route
        path="me"
        element={
          <MyTurnos
            onGetMyTurnos={getTurnosByUsuarioHandler}
            onCancelTurno={cancelTurnoHandler}
          />
        }
      />
      <Route
        path="me/cancelados"
        element={<MyTurnos onGetMyTurnos={getTurnosByUsuarioHandler} />}
      />
      <Route
        path="medicos/:id"
        element={
          <TurnosMedico
            onGetMedicoTurnos={getTurnosByMedicoHandler}
            onAsignTurno={asignTurnoHandler}
          />
        }
      />
      <Route
        path=""
        element={
          <Turnos
           // turnos={turnosDisponibles}
            isLoading={isLoading}
            error={error}
            onAsignTurno={asignTurnoHandler}
            onCancelTurno={cancelTurnoHandler}
            onDeleteTurno={deleteTurnoHandler}
          />
        }
      />
    </Routes>
  );
};

export default TurnosContainer;
