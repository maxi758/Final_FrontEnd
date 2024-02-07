import React from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import { Card, CircularProgress } from '@mui/material';
import MedicoList from '../components/MedicoList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const Medicos = ({ isLoading, medicos, error }) => {
  const { clearError } = useHttpClient();
  const medicoDeletedHandler = (deletedMedicoId) => {
    setLoadedMedicos((prevMedicos) =>
      prevMedicos.filter((medico) => medico.id !== deletedMedicoId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <CircularProgress asOverlay />
        </div>
      )}
      {!medicos && !isLoading && (
        <div className="center">
          <Card>
            <h2>No hay médicos</h2>
          </Card>
        </div>
      )}
      {/* asOverlay es para que el spinner se vea sobre el contenido */}
      {!isLoading && medicos && (
        <MedicoList items={medicos} onDeleteMedico={medicoDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default Medicos;
