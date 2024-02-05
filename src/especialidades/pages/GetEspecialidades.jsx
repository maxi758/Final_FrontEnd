import React from 'react';
import { CircularProgress } from '@mui/material';
import EspecialidadList from '../components/EspecialidadList';

const Especialidades = ({ isLoading, especialidades }) => {
  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
      {!isLoading && especialidades && (
        <EspecialidadList items={especialidades} />
      )}
    </React.Fragment>
  );
};

export default Especialidades;
