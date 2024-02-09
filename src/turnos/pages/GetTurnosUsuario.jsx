import React, { useEffect, useState, useContext } from 'react';
import { useParams, useMatch } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';

import { Card, CircularProgress } from '@mui/material';
import TurnoList from '../components/TurnoList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../context/auth-context';
import { useSelector } from 'react-redux';

const Turnos = ({ onGetMyTurnos, onCancelTurno }) => {
  const match = useMatch('/turnos/me/cancelados');
  console.log('match', match);
  const estado =
    match?.pathname?.endsWith('cancelados') ?? false ? 'CANCELADO' : 'ASIGNADO';
  console.log('estado', estado);
  const { turnosActivosUsuario, turnosCanceladosUsuario, isLoading } =
    useSelector((state) => state.turnos);
  const [loadedTurnos, setLoadedTurnos] = useState();
  const { error, clearError } = useHttpClient();

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
      {!turnosActivosUsuario && !isLoading && (
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
