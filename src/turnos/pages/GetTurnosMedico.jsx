import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CircularProgress } from '@mui/material';
import TurnoList from '../components/TurnoList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useSelector } from 'react-redux';
import { clearError } from '../../redux/reducers/turnosReducer';

const Turnos = ({ onGetMedicoTurnos, onAsignTurno }) => {
  const { turnosMedico, isLoading, error } = useSelector((state) => state.turnos);
  const medicoId = useParams().id;
  const { loadedTurnos, setLoadedTurnos } = useState([]);

  useEffect(() => {
    onGetMedicoTurnos(medicoId);
  }, [medicoId]);

  const AsignTurnoHandler = (turnoId) => {
    onAsignTurno(turnoId);
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
      {!turnosMedico && !isLoading && (
        <div className="center">
          <Card>
            <h2>No hay turnos</h2>
          </Card>
        </div>
      )}
      {/* asOverlay es para que el spinner se vea sobre el contenido */}
      {!isLoading && turnosMedico && (
        <TurnoList
          items={turnosMedico}
          //onDeleteMedico={turnoDeletedHandler}
          onAsignTurno={AsignTurnoHandler}
          isMyTurnos={false}
        />
      )}
    </React.Fragment>
  );
};

export default Turnos;
