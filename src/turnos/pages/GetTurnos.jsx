import React, {  } from 'react';
import { useHttpClient } from '../../hooks/http-hook';

import { Card, CircularProgress } from '@mui/material';
import TurnoList from '../components/TurnoList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const Turnos = ({turnos, isLoading, error}) => {

  const { clearError } = useHttpClient();

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
    // <React.Fragment>
    //     {isLoading && (
    //         <div className="center">
    //             <CircularProgress />
    //         </div>
    //     )}
    //     {!isLoading && loadedTurnos && <MedicoList items={loadedTurnos} />}
    // </React.Fragment>
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
        <TurnoList items={turnos} onDeleteMedico={turnoDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default Turnos;
