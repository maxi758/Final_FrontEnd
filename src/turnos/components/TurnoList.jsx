import React from 'react';

import { Card, Button, IconButton } from '@mui/material';
import TurnoItem from './TurnoItem';

import '../../medicos/components/ProductList.css';
import { useNavigate } from 'react-router-dom';

const TurnoList = (props) => {
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
          <h2>No se han encontrado turnos</h2>
          <Button to="/"></Button>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ul className="product-list">
        {props.items.map((turno) => (
          <TurnoItem
            key={turno.id}
            id={turno.id}
            medico={turno.medico}
            fecha={new Date(turno.fecha).toLocaleString()}
            observaciones={turno.observaciones}
            onDelete={props.onDeleteMedico}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default TurnoList;
