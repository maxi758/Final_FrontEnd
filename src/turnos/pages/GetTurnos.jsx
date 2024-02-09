import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';

import { Card, CircularProgress } from '@mui/material';
import TurnoList from '../components/TurnoList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useSelector } from 'react-redux';

const Turnos = ({ turnos, isLoading, error, onAsignTurno, onCancelTurno }) => {
  const { clearError } = useHttpClient();
  const { turnosDisponibles } = useSelector((state) => state.turnos);

  const AsignTurnoHandler = (turnoId) => {
    onAsignTurno(turnoId);
  };

  const cancelTurnoHandler = (turnoId) => {
    onCancelTurno(turnoId);
  };

  const turnoDeletedHandler = (deletedTurnoId) => {
    setLoadedTurnos((prevTurnos) =>
      prevTurnos.filter((turno) => turno.id !== deletedTurnoId)
    );
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
      {!turnos && !isLoading && (
        <div className="center">
          <Card>
            <h2>No hay turnos</h2>
          </Card>
        </div>
      )}
      {/* asOverlay es para que el spinner se vea sobre el contenido */}
      {!isLoading && turnos && (
        <TurnoList
          items={turnosDisponibles}
          onDeleteMedico={turnoDeletedHandler}
          onAsignTurno={AsignTurnoHandler}
          onCancelTurno={cancelTurnoHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Turnos;
