import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';
import '../../medicos/pages/PlaceForm.css';

const NewTurno = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      fecha: {
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

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('fecha', formState.inputs.fecha.value);
      formData.append('observaciones', formState.inputs.observaciones.value);
      formData.append('medico', formState.inputs.medico.value);

      console.log(formState);
      await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos`,
        'POST',
        JSON.stringify({
          fecha: formState.inputs.fecha.value,
          observaciones: formState.inputs.observaciones.value,
          medico: formState.inputs.medico.value,
        }),
        {
          'Content-Type': 'application/json', // le decimos que le estamos enviando un json
          Authorization: 'Bearer ' + auth.token, // el token lo obtenemos del context
        }
      );
      navigate('/turnos'); // redirecciona al home
    } catch (err) {}
  };

  if (error) {
    return (
      <ErrorModal
        error={error.message}
        code={error.code}
        onClear={clearError}
      />
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
          label="Nombre"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor ingrese una fecha valida."
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
          element="input"
          type="text"
          label="Medico"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor ingrese un id de médico valido."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Agregar Turno
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewTurno;
