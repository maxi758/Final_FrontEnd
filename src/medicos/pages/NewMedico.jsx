import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';
import './PlaceForm.css';
import { useSelector } from 'react-redux';

const NewMedico = ({ onCreateMedico }) => {
  const { token } = useSelector((state) => state.auth);
  const { especialidades } = useSelector((state) => state.especialidades);
  //const [especialidades, setEspecialidades] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      nombre: {
        value: '',
        isValid: false,
      },
      apellido: {
        value: '',
        isValid: false,
      },
      matricula: {
        value: '',
        isValid: false,
      },
      especialidad: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate(); // useNavigate es un hook que nos da react-router-dom para redireccionar, tiene la misma funcionalidad que useHistory

  /*useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/especialidades`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          }
        );
        setEspecialidades(responseData.especialidades);

        setFormData(
          {
            ...formState.inputs,
            especialidad: {
              value: responseData.especialidad[0].id,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };

    fetchEspecialidades();
  }, [sendRequest, token]);*/
  useEffect(() => {
    if (especialidades && especialidades.length > 0) {
      setFormData(
        {
          ...formState.inputs,
          especialidad: {
            value: especialidades[0].id,
            isValid: true,
          },
        },
        true
      );
    }
  }, [token, especialidades]);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    console.log('formState.inputs: ', formState.inputs);
    console.log('token: ', token);
    onCreateMedico(
      formState.inputs.nombre.value,
      formState.inputs.apellido.value,
      formState.inputs.matricula.value,
      formState.inputs.especialidad.value,
      token
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form method="POST" className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="nombre"
          name="nombre"
          element="input"
          type="text"
          label="Nombre"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor ingrese un ombre valido."
          onInput={inputHandler}
        />
        <Input
          id="apellido"
          element="textarea"
          label="Apellido"
          validators={[VALIDATOR_MINLENGTH(2)]}
          errorText="Por favor ingrese un apellido valido."
          onInput={inputHandler}
        />
        <Input
          id="matricula"
          element="input"
          type="text"
          label="Matricula"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor ingrese una matricula valida."
          onInput={inputHandler}
        />
        <Input
          id="especialidad"
          element="select"
          label="Especialidad"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor ingrese una especialidad valida."
          onInput={inputHandler}
        >
          {especialidades.map((especialidad) => (
            <option key={especialidad.id} value={especialidad.id}>
              {especialidad.nombre}
            </option>
          ))}
        </Input>
        <Button type="submit" disabled={!formState.isValid}>
          Agregar Medico
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewMedico;
