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

const UpdateMedico = ({ onUpdateMedico, onFindOneMedico }) => {
  const { token } = useSelector((state) => state.auth);
  const { loadedMedico, isLoading } = useSelector((state) => state.medicos);
  const { especialidades } = useSelector((state) => state.especialidades);
  const navigate = useNavigate();
  const medicoId = useParams().id;
  console.log('medicoId: ', medicoId);
  const { error, sendRequest, clearError } = useHttpClient();
  const [isLoadingMedico, setIsLoadingMedico] = useState(true);
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
        await onFindOneMedico(medicoId, token);
        setFormData(
          {
            nombre: {
              value: loadedMedico.nombre,
              isValid: true,
            },
            apellido: {
              value: loadedMedico.apellido,
              isValid: true,
            },
            matricula: {
              value: loadedMedico.matricula,
              isValid: true,
            },
            especialidad: {
              value: loadedMedico.especialidad,
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
  }, [medicoId, setFormData, token]);

  const medicoUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    onUpdateMedico(
      medicoId,
      formState.inputs.nombre.value,
      formState.inputs.apellido.value,
      formState.inputs.matricula.value,
      formState.inputs.especialidad.value,
      token
    );
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

  if (isLoading || !loadedMedico ) {
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
