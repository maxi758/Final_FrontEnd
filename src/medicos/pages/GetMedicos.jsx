import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';

import { Card, CircularProgress } from '@mui/material';
import MedicoList from '../components/MedicoList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useSelector } from 'react-redux';

const Medicos = () => {
  const { token } = useSelector((state) => state.auth);
  const [loadedMedicos, setLoadedMedicos] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        console.log('fetching medicos');
        console.log(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos`);
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          }
        );
        console.log('Response from fetch', responseData.medicos);
        setLoadedMedicos(responseData.medicos);
      } catch (err) {
        console.log('Error: ', err);
      }
    };
    fetchMedicos();
  }, [sendRequest]);

  const medicoDeletedHandler = (deletedMedicoId) => {
    setLoadedMedicos((prevMedicos) =>
      prevMedicos.filter((medico) => medico.id !== deletedMedicoId)
    );
  };

  return (
    // <React.Fragment>
    //     {isLoading && (
    //         <div className="center">
    //             <CircularProgress />
    //         </div>
    //     )}
    //     {!isLoading && loadedMedicos && <MedicoList items={loadedMedicos} />}
    // </React.Fragment>
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <CircularProgress asOverlay />
        </div>
      )}
      {!loadedMedicos && !isLoading && (
        <div className="center">
          <Card>
            <h2>No hay médicos</h2>
          </Card>
        </div>
      )}
      {/* asOverlay es para que el spinner se vea sobre el contenido */}
      {!isLoading && loadedMedicos && (
        <MedicoList items={loadedMedicos} onDeleteMedico={medicoDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default Medicos;
