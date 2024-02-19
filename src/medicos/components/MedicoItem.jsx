import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CircularProgress, Button } from '@mui/material';
import { useHttpClient } from '../../hooks/http-hook';

import './ProductItem.css';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Modal from '../../shared/components/UIElements/Modal';
//import Button from '../../shared/components/FormElements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/reducers/medicosReducer';

const MedicoItem = (props) => {
  const { isLoading, error} = useSelector((state) => state.medicos);
  const { token, rol } = useSelector((state) => state.auth);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();
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
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  const clearErrorHandler = () => {
    dispatch(clearError());
  };

  return (
    <React.Fragment>
      {error &&<ErrorModal error={error.message} onClear={clearErrorHandler} />}
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Está seguro?"
        footerClass="product-item__modal-actions"
        footer={
          <React.Fragment>
            <Button
              inverse
              color="warning"
              variant="contained"
              onClick={cancelDeleteHandler}
            >
              CANCELAR
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={confirmDeleteHandler}
            >
              ELIMINAR
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
