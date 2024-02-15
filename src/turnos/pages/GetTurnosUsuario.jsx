import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Card, CircularProgress } from '@mui/material';
import TurnoList from '../components/TurnoList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/reducers/turnosReducer';

const Turnos = ({ onGetMyTurnos, onCancelTurno }) => {
  const match = useMatch('/turnos/me/cancelados');
  console.log('match', match);
  const estado =
    match?.pathname?.endsWith('cancelados') ?? false ? 'CANCELADO' : 'ASIGNADO';
  console.log('estado', estado);
  const dispatch = useDispatch();
  const { turnosActivosUsuario, turnosCanceladosUsuario, isLoading, error } =
    useSelector((state) => state.turnos);

  useEffect(() => {
    onGetMyTurnos(estado);
  }, [estado]);
  let turnosUsuario;
  if (estado === 'ASIGNADO') {
    turnosUsuario = turnosActivosUsuario;
  } else {
    turnosUsuario = turnosCanceladosUsuario;
  }

  const cancelTurnoHandler = (turnoId) => {
    onCancelTurno(turnoId);
  };

  /*const turnoDeletedHandler = (deletedTurnoId) => {
    setLoadedTurnos((prevTurnos) =>
      prevTurnos.filter((turno) => turno.id !== deletedTurnoId)
    );
  };*/

  const clearErrorHandler = () => {
    dispatch(clearError())
  };

  if (error) {
    console.log(error);
    return (
      <ErrorModal
        error={error.message}
        code={error.errorCode}
        onClear={clearErrorHandler}
      />
    );
  }

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <CircularProgress asOverlay />
        </div>
      )}
      {!turnosUsuario && !isLoading && (
        <div className="center">
          <Card>
            <h2>No hay turnos</h2>
          </Card>
        </div>
      )}
      {/* asOverlay es para que el spinner se vea sobre el contenido */}
      {!isLoading && turnosUsuario && (
        <TurnoList
          items={turnosUsuario}
          //onDeleteMedico={turnoDeletedHandler}
          onCancelTurno={cancelTurnoHandler}
          isMyTurnos={true}
          selectedEstado={estado}
        />
      )}
    </React.Fragment>
  );
};

export default Turnos;
