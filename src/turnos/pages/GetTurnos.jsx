import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import { selectAllTurnos } from '../../redux/reducers/turnosReducer';
import { Card, CircularProgress } from '@mui/material';
import TurnoList from '../components/TurnoList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useSelector } from 'react-redux';

const Turnos = ({ error, onAsignTurno, onCancelTurno, onDeleteTurno }) => {
  const { clearError } = useHttpClient();
  const { turnosDisponibles, isLoading } = useSelector((state) => state.turnos);
  const orderedTurnos = useSelector(selectAllTurnos);

  const AsignTurnoHandler = (turnoId) => {
    onAsignTurno(turnoId);
  };

  const cancelTurnoHandler = (turnoId) => {
    onCancelTurno(turnoId);
  };

  const turnoDeletedHandler = (deletedTurnoId) => {
    onDeleteTurno(deletedTurnoId);
  };

  if (error) {
    console.log(error);
    return (
      <ErrorModal
        error={error.message}
        code={error.errorCode}
        onClear={clearError}
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
      {!turnosDisponibles && !isLoading && (
        <div className="center">
          <Card>
            <h2>No hay turnos</h2>
          </Card>
        </div>
      )}
      {/* asOverlay es para que el spinner se vea sobre el contenido */}
      {!isLoading && turnosDisponibles && (
        <TurnoList
          items={orderedTurnos}
          onDeleteTurno={turnoDeletedHandler}
          onAsignTurno={AsignTurnoHandler}
          onCancelTurno={cancelTurnoHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Turnos;
