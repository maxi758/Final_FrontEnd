import React, { useEffect } from 'react';
import Input from '../../shared/components/FormElements/Input';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import { useForm } from '../../hooks/form-hook';
import './PlaceForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/reducers/medicosReducer';

const NewMedico = ({ onCreateMedico }) => {
  const { token } = useSelector((state) => state.auth);
  const { especialidades } = useSelector((state) => state.especialidades);
  const { isLoading, error } = useSelector((state) => state.medicos);
  const dispatch = useDispatch();
  //const [especialidades, setEspecialidades] = useState([]);
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
    if (especialidades && especialidades.length > 0) {
      setFormData(
        {
          ...formState.inputs,
          especialidad: {
            value: especialidades[0].id,
            isValid: true,
          },
        },
        false
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

  const clearErrorHandler = () => {
    dispatch(clearError());
  };

  if (error) {
    return (
      <Dialog open={error} onClear={clearErrorHandler}>
        <DialogTitle>
          Ha ocurrido un error: {`Código ${error.errorCode}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{error.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            variant="contained"
            onClick={clearErrorHandler}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  if (isLoading || !especialidades) {
    return (
      <div className="center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <React.Fragment>
      {/* <ErrorModal error={error.message} onClear={clearErrorHandler} /> */}
      <form method="POST" className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <CircularProgress asOverlay />}
        <Input
          id="nombre"
          name="nombre"
          element="input"
          type="text"
          label="Nombre"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor ingrese un nombre valido."
          onInput={inputHandler}
          initialValid={false}
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
