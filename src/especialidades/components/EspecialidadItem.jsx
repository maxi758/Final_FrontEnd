import React from 'react';
import { Card } from '@mui/material';
import './ProductItem.css';

const EspecialidadItem = (props) => {
  return (
    <li className="product-item">
      <Card className="product-item__content">
        <div className="product-item__info">
          <h2>{props.nombre}</h2>
          <p>{props.descripcion}</p>
        </div>
      </Card>
    </li>
  );
};

export default EspecialidadItem;
