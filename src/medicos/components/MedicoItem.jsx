import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CircularProgress, Button } from '@mui/material';
import { useHttpClient } from '../../hooks/http-hook';

import './ProductItem.css';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Modal from '../../shared/components/UIElements/Modal';
//import Button from '../../shared/components/FormElements/Button';
import { useSelector } from 'react-redux';

const MedicoItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { token, rol } = useSelector((state) => state.auth);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [item, setItem] = useState({
    id: props.id,
    nombre: props.nombre,
    quantity: props.quantity,
  });
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos/${props.id}`,
        'DELETE',
        null,
        { Authorization: 'Bearer ' + token }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="product-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Estás seguro que deseas eliminar este medico? Una vez eliminado no se
          podrá recuperar.
        </p>
      </Modal>
      <li className="product-item">
        <Card className="product-item__content">
          {isLoading && <CircularProgress asOverlay />}
          <div className="product-item__info">
            <h2>
              {props.nombre} {props.apellido}
            </h2>
            <p>{props.matricula}</p>
            <p>{props.especialidad.nombre}</p>
          </div>
          <div className="product-item__actions">
            <Button
              color="success"
              variant="contained"
              component={Link}
              to={{
                pathname: `/turnos/medicos/${props.id}`,
                state: { isMyTurnos: false },
              }}
            >
              TURNOS
            </Button>
          </div>
          <div className="product-item__actions">
            {rol === 'ADMIN' && (
              <Button color="warning" variant="contained" component={Link} to={`/medicos/${props.id}`}>EDITAR</Button>
            )}
            {rol === 'ADMIN' && (
              <Button color="error" variant="contained" onClick={showDeleteWarningHandler}>
                ELIMINAR
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default MedicoItem;
