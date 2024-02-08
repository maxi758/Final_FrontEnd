import React, { useState, useContext } from 'react';

import { Card, CircularProgress } from '@mui/material';
import { useHttpClient } from '../../hooks/http-hook';

import '../../medicos/components/ProductItem.css';
import { AuthContext } from '../../context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import { useSelector } from 'react-redux';

const TurnoItem = (props) => {
  const { isLoading } = useSelector((state) => state.turnos);
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
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
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos/${props.id}`,
        'DELETE',
        null,
        { Authorization: 'Bearer ' + auth.token }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  const asignarTurnoHandler = async () => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos/${
          props.id
        }/reservar`,
        'PATCH',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  const cancelTurnoHandler = async () => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos/${
          props.id
        }/cancelar`,
        'PATCH',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  if (error) {
    <ErrorModal error={error.message} code={error.code} onClear={clearError} />;
  }

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
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
          </div>
          <div className="product-item__actions">
            {auth.rol === 'ADMIN' && (
              <Button to={`/turnos/${props.id}`}>EDITAR</Button>
            )}
            {auth.rol === 'ADMIN' && (
              <Button danger onClick={showDeleteWarningHandler}>
                ELIMINAR
              </Button>
            )}
            {auth.rol === 'PACIENTE' && !props.isMyTurnos && (
              <Button onClick={asignarTurnoHandler}>ASIGNAR</Button>
            )}
            {auth.rol === 'PACIENTE' && props.isMyTurnos && props.selectedEstado === 'ASIGNADO' && (
              <Button danger onClick={cancelTurnoHandler}>
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
