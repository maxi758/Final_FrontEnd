import React, { useState } from 'react';

import { Button, Card, CircularProgress } from '@mui/material';
import { useHttpClient } from '../../hooks/http-hook';

import './ProductItem.css';

const MedicoItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [item, setItem] = useState({
    id: props.id,
    nombre: props.nombre,
    quantity: props.quantity,
  });

  return (
    <li className="product-item">
      <Card className="product-item__content">
        {isLoading && <CircularProgress asOverlay />}
        <div className="product-item__info">
          <h2>{props.nombre}</h2>
          <p>{props.apellido}</p>
          <p>{props.matricula}</p>
          <p>{props.especialidad.nombre}</p>
        </div>
      </Card>
    </li>
  );
};

export default MedicoItem;
