import React, { useState } from 'react';

import { Card, CircularProgress, Button } from '@mui/material';

import '../../medicos/components/ProductItem.css';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Modal from '../../shared/components/UIElements/Modal';
//import Button from '../../shared/components/FormElements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearError } from '../../redux/reducers/turnosReducer';

const TurnoItem = (props) => {
  const { isLoading, error } = useSelector((state) => state.turnos);
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
    } catch (err) {}
  };

  const asignarTurnoHandler = async () => {
    try {
      props.onAsignTurno(props.id);
    } catch (err) {}
  };

  const cancelTurnoHandler = async () => {
    try {
      props.onCancelTurno(props.id);
    } catch (err) {}
  };

  const clearErrorHandler = () => {
    dispatch(clearError());
  };

  if (error) {
    <ErrorModal error={error.message} code={error.code} onClear={clearErrorHandler} />;
  }

  console.log('props', props);
  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Está seguro de eliminar?"
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
          Estás seguro que deseas eliminar este turno? Una vez eliminado no se
          podrá recuperar.
        </p>
      </Modal>
      <li className="product-item">
        <Card className="product-item__content">
          {isLoading && <CircularProgress asOverlay />}
          <div className="product-item__info">
            <h2>
              {props.medico.nombre} {props.medico.apellido}
            </h2>
            <p>{props.fecha}</p>
            <p>{props.observaciones}</p>
            <p>{props.isMyTurnos}</p>
          </div>
          <div className="product-item__actions">
            {rol === 'ADMIN' && (
              <Button
                color="warning"
                variant="contained"
                component={Link}
                to={`/turnos/${props.id}`}
              >
                EDITAR
              </Button>
            )}
            {rol === 'ADMIN' && (
              <Button
                color="error"
                variant="contained"
                onClick={showDeleteWarningHandler}
              >
                ELIMINAR
              </Button>
            )}
            {rol === 'PACIENTE' && props.isMyTurnos === false && (
              <Button
                color="success"
                variant="contained"
                onClick={asignarTurnoHandler}
              >
                ASIGNAR
              </Button>
            )}
            {rol === 'PACIENTE' &&
              props.isMyTurnos &&
              props.selectedEstado === 'ASIGNADO' && (
                <Button
                  color="error"
                  variant="contained"
                  onClick={cancelTurnoHandler}
                >
                  CANCELAR
                </Button>
              )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default TurnoItem;
