import React from 'react';

import { Card, Button, IconButton } from '@mui/material';
import MedicoItem from './MedicoItem';

import './ProductList.css';
import { useNavigate } from 'react-router-dom';

const MedicoList = (props) => {
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
          <h2>No se han encontrado medicos</h2>
          <Button to="/"></Button>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ul className="product-list">
        {props.items.map((medico) => (
          <MedicoItem
            key={medico.id}
            id={medico.id}
            nombre={medico.nombre}
            apellido={medico.apellido}
            matricula={medico.matricula}
            especialidad={medico.especialidad.nombre}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default MedicoList;
