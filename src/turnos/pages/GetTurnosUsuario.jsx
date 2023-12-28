import React, { useEffect, useState, useContext } from 'react';
import { useParams, useMatch } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';

import { Card, CircularProgress } from '@mui/material';
import TurnoList from '../components/TurnoList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../context/auth-context';

const Turnos = () => {
  const auth = useContext(AuthContext);
  const pacienteId = auth.userId;
  const {id} = useParams();
  const match = useMatch('/turnos/me/cancelados');
  console.log('match', match);
  const estado = (match?.pathname?.endsWith('cancelados')??false) ? 'CANCELADO' : 'ASIGNADO';
  console.log('estado', estado);
  const [loadedTurnos, setLoadedTurnos] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        console.log('fetching Turnos');
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos/pacientes/${pacienteId}?estado=${estado}`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token,
          }
        );
        console.log('Response from fetch', responseData.turnos);
        setLoadedTurnos(responseData.turnos);
      } catch (err) {
        console.log('Error: ', err);
      }
    };
    fetchTurnos();
  }, [sendRequest, estado]);

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
      {!loadedTurnos && !isLoading && (
        <div className="center">
          <Card>
            <h2>No hay turnos</h2>
          </Card>
        </div>
      )}
      {/* asOverlay es para que el spinner se vea sobre el contenido */}
      {!isLoading && loadedTurnos && (
        <TurnoList items={loadedTurnos} onDeleteMedico={turnoDeletedHandler} isMyTurnos={true} />
      )}
    </React.Fragment>
  );
};

export default Turnos;
