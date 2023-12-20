import React from 'react';

import { Card, Button, IconButton } from '@mui/material';
import EspecialidadItem from './EspecialidadItem';

import './ProductList.css';
import { useNavigate } from 'react-router-dom';

const EspecialidadList = (props) => {
  const navigate = useNavigate();

  /*const handleRedirect = () => {
    if (!orderId) {
      navigate('/products');
      return;
    }
    navigate(`/orders/${orderId}`);
  };*/
  
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
