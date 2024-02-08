import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../hooks/form-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useHttpClient } from '../../hooks/http-hook';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import '../../medicos/pages/PlaceForm.css';
import { useSelector } from 'react-redux';

const UpdateTurno = ({ onUpdateTurno, onFindOneTurno }) => {
  const { token } = useSelector((state) => state.auth);
  const { isLoading, loadedTurno } = useSelector((state) => state.turnos);
  const navigate = useNavigate();
  const turnoId = useParams().id;
  const { error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      observaciones: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchTurno = async () => {
      try {
        await onFindOneTurno(turnoId, token);
        setFormData(
          {
            observaciones: {
              value: loadedTurno.observaciones,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchTurno();
  }, [turnoId, token, setFormData]);

  const turnoUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    onUpdateTurno(turnoId, formState.inputs.observaciones.value, token);
  };

  if (error) {
    console.log(error);
    return (
      <ErrorModal
        error={error.message}
        code={error.errorCode}
        onClear={clearError}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <React.Fragment>
      {/* <ErrorModal error={error.message} onClear={clearError} /> */}
      <form className="place-form" onSubmit={turnoUpdateSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="observaciones"
          element="textarea"
          label="Observaciones"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor, ingrese una observacion."
          onInput={inputHandler}
          initialValue={loadedTurno.observaciones}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ACTUALIZAR TURNO
        </Button>
      </form>
    </React.Fragment>
  );
};

export default UpdateTurno;
