import React, { useEffect, useState } from 'react';
import { Card, CircularProgress } from '@mui/material';
import MedicoList from '../components/MedicoList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { clearError } from '../../redux/reducers/medicosReducer';
import { useDispatch, useSelector } from 'react-redux';

const Medicos = () => {
  const [loadedMedicos, setLoadedMedicos] = useState([]);
  const { medicos, isLoading, error } = useSelector((state) => state.medicos);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoadedMedicos(medicos);
  }, [medicos]);

  const medicoDeletedHandler = (deletedMedicoId) => {
    setLoadedMedicos((prevMedicos) =>
      prevMedicos.filter((medico) => medico._id !== deletedMedicoId)
    );
  };

  const clearErrorHandler = () => {
    dispatch(clearError());
  };

  return (
    <React.Fragment>
      {error &&<ErrorModal
        error={error.message}
        code={error.errorCode}
        onClear={clearErrorHandler}
      />}
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
        <MedicoList
          items={loadedMedicos}
          onDeleteMedico={medicoDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Medicos;
