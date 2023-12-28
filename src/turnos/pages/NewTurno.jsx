import React, { useContext, useState, useEffect } from 'react';
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
  const [medicos, setMedicos] = useState([]);
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
    const fetchMedicos = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token,
          }
        );
        setMedicos(responseData.medicos);

        setFormData(
          {
            ...formState.inputs,
            medico: {
              value: responseData.medicos[0].id,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };

    fetchMedicos();
  }, [sendRequest, auth.token]);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('fecha', formState.inputs.fecha.value);
      formData.append('hora', formState.inputs.hora.value);
      formData.append('observaciones', formState.inputs.observaciones.value);
      formData.append('medico', formState.inputs.medico.value);

      const date = formState.inputs.fecha.value;
      const time = formState.inputs.hora.value;
      const fecha = new Date(`${date} ${time}`);

      console.log(formState);
      await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos`,
        'POST',
        JSON.stringify({
          fecha,
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
            <option key={medico.id} value={medico.id}>
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
