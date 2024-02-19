import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination } from '@mui/material';
import MedicoList from '../components/MedicoList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { clearError, getMedicos } from '../../redux/reducers/medicosReducer';
import { useDispatch, useSelector } from 'react-redux';

const Medicos = ({onDeleteMedico}) => {
  const [loadedMedicos, setLoadedMedicos] = useState([]);
  const { medicos, isLoading, error, totalPages } = useSelector((state) => state.medicos);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoadedMedicos(medicos);
  }, [medicos]);

  const medicoDeletedHandler = (deletedMedicoId) => {
    onDeleteMedico(deletedMedicoId)
  };

  const clearErrorHandler = () => {
    dispatch(clearError());
  };

  const changePageHandler = (event, value) => {
    setPage(value);
    dispatch(getMedicos(value));
  };

  return (
    <React.Fragment>
      {error && (
       <Dialog open={error} onClear={clearErrorHandler}>
       <DialogTitle>
         Ha ocurrido un error: {`Código ${error.errorCode}`}
       </DialogTitle>
       <DialogContent>
         <DialogContentText>{error.message}</DialogContentText>
       </DialogContent>
       <DialogActions>
         <Button
           color="success"
           variant="contained"
           onClick={clearErrorHandler}
         >
           OK
         </Button>
       </DialogActions>
     </Dialog>
      )}
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
        <div>
          <MedicoList
            items={loadedMedicos}
            onDeleteMedico={medicoDeletedHandler}
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

export default Medicos;
