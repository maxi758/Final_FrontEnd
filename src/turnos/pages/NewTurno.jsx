import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import { useForm } from '../../hooks/form-hook';
import '../../medicos/pages/PlaceForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/reducers/turnosReducer';

const NewTurno = ({ onCreateTurno }) => {
  const { token } = useSelector((state) => state.auth);
  const { medicos } = useSelector((state) => state.medicos);
  const { turnosDisponibles, isLoading, error } = useSelector((state) => state.turnos);
  const dispatch = useDispatch();
  const [formState, inputHandler, setFormData] = useForm(
    {
      fecha: {
        value: '',
        isValid: false,
      },
      hora: {
        value: '',
        isValid: false,
      },
      observaciones: {
        value: '',
        isValid: false,
      },
      medico: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate(); // useNavigate es un hook que nos da react-router-dom para redireccionar, tiene la misma funcionalidad que useHistory

  useEffect(() => {
    if (medicos && medicos.length > 0) {
      setFormData(
        {
          ...formState.inputs,
          medico: {
            value: medicos[0]._id,
            isValid: true,
          },
        },
        true
      );
    }
  }, [token, medicos]);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    const date = formState.inputs.fecha.value;
    const time = formState.inputs.hora.value;
    const fecha = new Date(`${date} ${time}`);

    await onCreateTurno(
      fecha,
      formState.inputs.observaciones.value,
      formState.inputs.medico.value,
      token
    );
  };

  const clearErrorHandler = () => {
    dispatch(clearError())
  };

  if (error) {
    return (
      <ErrorModal
        error={error.message}
        code={error.code}
        onClear={clearErrorHandler}
      />
    );
  }
  if (isLoading || !turnosDisponibles) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <form method="POST" className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="fecha"
          name="fecha"
          element="input"
          type="date"
          label="Fecha"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor ingrese una fecha valida."
          onInput={inputHandler}
        />
        <Input
          id="hora"
          element="input"
          type="time"
          label="Hora"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor ingrese una hora valida."
          onInput={inputHandler}
        />
        <Input
          id="observaciones"
          element="input"
          type="text"
          label="Observaciones"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor ingrese un texto valido."
          onInput={inputHandler}
        />
        <Input
          id="medico"
          element="select"
          label="Medico"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor seleccione un médico."
          onInput={inputHandler}
        >
          {medicos.map((medico) => (
            <option key={medico._id} value={medico._id}>
              {medico.nombre} {medico.apellido}
            </option>
          ))}
        </Input>
        <Button type="submit" disabled={!formState.isValid}>
          Agregar Turno
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewTurno;
