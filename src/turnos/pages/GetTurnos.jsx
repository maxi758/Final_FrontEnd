import React, { useEffect, useState } from 'react';
import {
  clearError,
  getTurnos,
  selectAllTurnos,
} from '../../redux/reducers/turnosReducer';
import { Box, Card, CircularProgress, Pagination } from '@mui/material';
import TurnoList from '../components/TurnoList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useDispatch, useSelector } from 'react-redux';

const Turnos = ({ onAsignTurno, onCancelTurno, onDeleteTurno }) => {
  const { turnosDisponibles, isLoading, error, totalPages } = useSelector(
    (state) => state.turnos
  );
  const orderedTurnos = useSelector(selectAllTurnos);
  console.log('orderedTurnos', orderedTurnos.length);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const AsignTurnoHandler = (turnoId) => {
    onAsignTurno(turnoId);
  };

  const cancelTurnoHandler = (turnoId) => {
    onCancelTurno(turnoId);
  };

  const turnoDeletedHandler = (deletedTurnoId) => {
    onDeleteTurno(deletedTurnoId);
  };

  const clearErrorHandler = () => {
    dispatch(clearError());
  };

  const changePageHandler = (event, value) => {
    setPage(value);
    dispatch(getTurnos(value));
  };

  if (error) {
    return (
      <ErrorModal
        error={error.message}
        code={error.errorCode}
        onClear={clearErrorHandler}
      />
      // <div className="center">
      //   <Card>
      //     <h2>{error.errorCode}</h2>
      //     <h3>{error.message}</h3>
      //   </Card>
      // </div>
    );
  }

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <CircularProgress asOverlay />
        </div>
      )}
      {!orderedTurnos && !isLoading && (
        <div className="center">
          <Card>
            <h2>No hay turnos</h2>
          </Card>
        </div>
      )}
      {/* asOverlay es para que el spinner se vea sobre el contenido */}
      {!isLoading && orderedTurnos.length !== 0 && (
        <div className="center">
          <TurnoList
            items={orderedTurnos}
            onDeleteTurno={turnoDeletedHandler}
            onAsignTurno={AsignTurnoHandler}
            onCancelTurno={cancelTurnoHandler}
          />

          <Box display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              color="primary"
              page={page}
              onChange={changePageHandler}
            />
          </Box>
        </div>
      )}
    </React.Fragment>
  );
};

export default Turnos;
