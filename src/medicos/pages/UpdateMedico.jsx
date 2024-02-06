import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useForm } from '../../hooks/form-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useHttpClient } from '../../hooks/http-hook';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './PlaceForm.css';
import { useSelector } from 'react-redux';

const UpdateMedico = (props) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const medicoId = useParams().id;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [especialidades, setEspecialidades] = useState({});
  const [isLoadingMedico, setIsLoadingMedico] = useState(true);
  const [loadedMedico, setLoadedMedico] = useState({
    nombre: props.nombre,
    apellido: props.apellido,
    matricula: props.matricula,
    especialidad: props.especialidad,
  });
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

  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const especialidadData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/especialidades`,
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          }
        );
        console.log(especialidadData.especialidades);
        setEspecialidades(especialidadData.especialidades);
        console.log(medicoId);
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos/${medicoId}`,
          'GET',
          null,
          { Authorization: 'Bearer ' + token }
        );
        console.log(responseData.medico);
        setLoadedMedico(responseData.medico);
        setFormData(
          {
            nombre: {
              value: responseData.medico.nombre,
              isValid: true,
            },
            apellido: {
              value: responseData.medico.apellido,
              isValid: true,
            },
            matricula: {
              value: responseData.medico.matricula,
              isValid: true,
            },
            especialidad: {
              value: responseData.medico.especialidad,
              isValid: true,
            },
          },
          true
        );
        setIsLoadingMedico(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMedico();
  }, [sendRequest, medicoId, setFormData, token]);

  const medicoUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nombre', formState.inputs.nombre.value);
      formData.append('apellido', formState.inputs.apellido.value);
      formData.append('matricula', formState.inputs.matricula.value);
      formData.append('especialidad', formState.inputs.especialidad.value); // el value es el archivo

      const response = await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos/${medicoId}`,
        'PATCH',
        JSON.stringify({
          nombre: formState.inputs.nombre.value,
          apellido: formState.inputs.apellido.value,
          matricula: formState.inputs.matricula.value,
          especialidad: formState.inputs.especialidad.value,
        }),
        {
          'Content-Type': 'application/json', // le decimos que le estamos enviando un json
          Authorization: 'Bearer ' + token,
        }
      );

        //console.log(response.code);
      //return response;
      navigate('/medicos');
    } catch (err) {
        console.log(err);
        //setError(err.message);
    }
  };

  if (error) {
    console.log(error);
    return (
      <ErrorModal error={error.message} code={error.errorCode}  onClear={clearError} />
    );
  }

  if (isLoadingMedico) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <React.Fragment>
      {/* <ErrorModal error={error.message} onClear={clearError} /> */}
      <form className="place-form" onSubmit={medicoUpdateSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="nombre"
          element="input"
          type="text"
          label="Nombre"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor, ingrese un nombre válido."
          onInput={inputHandler}
          initialValue={loadedMedico.nombre}
          initialValid={true}
        />
        <Input
          id="apellido"
          element="input"
          type="text"
          label="Apellido"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor, ingrese un apellido válido."
          onInput={inputHandler}
          initialValue={loadedMedico.apellido}
          initialValid={true}
        />
        <Input
          id="matricula"
          element="input"
          type="text"
          label="Matricula"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor, ingrese una matricula válida."
          onInput={inputHandler}
          initialValue={loadedMedico.matricula}
          initialValid={true}
        />
        <Input
          id="especialidad"
          element="select"
          label="Especialidad"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor, ingrese una especialidad válida."
          onInput={inputHandler}
          initialValue={loadedMedico.especialidad}
          initialValid={true}
        >
          {especialidades.map((especialidad) => (
            <option key={especialidad.id} value={especialidad.id}>
              {especialidad.nombre}
            </option>
          ))}
        </Input>
        <Button type="submit" disabled={!formState.isValid}>
          ACTUALIZAR MEDICO
        </Button>
      </form>
    </React.Fragment>
  );
};

export default UpdateMedico;
