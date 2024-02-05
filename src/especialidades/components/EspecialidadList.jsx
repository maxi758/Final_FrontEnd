import React from 'react';
import { Card, Button } from '@mui/material';
import EspecialidadItem from './EspecialidadItem';

import './ProductList.css';

const EspecialidadList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="product-list center">
        <Card>
          <h2>No products found</h2>
          <Button to="/"></Button>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ul className="product-list">
        {console.log('items', props.items)}
        {props.items.map((especialidad) => (
          <EspecialidadItem
            key={especialidad.id}
            id={especialidad.id}
            nombre={especialidad.nombre}
            descripcion={especialidad.descripcion}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default EspecialidadList;
