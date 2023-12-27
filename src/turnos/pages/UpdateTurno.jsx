import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import { useForm } from '../../hooks/form-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useHttpClient } from '../../hooks/http-hook';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import '../../medicos/pages/PlaceForm.css';

const UpdateTurno = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const turnoId = useParams().id;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isLoadingTurno, setIsLoadingTurno] = useState(true);
  const [loadedTurno, setLoadedTurno] = useState({
    observaciones: props.observaciones,
  });
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
        console.log(turnoId);
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos/${turnoId}`,
          'GET',
          null,
          { Authorization: 'Bearer ' + auth.token }
        );
        console.log(responseData.turno);
        setLoadedTurno(responseData.turno);
        setFormData(
          {
            observaciones: {
              value: responseData.observaciones,
              isValid: true,
            },
          },
          true
        );
        setIsLoadingTurno(false);
      } catch (err) {}
    };
    fetchTurno();
  }, [sendRequest, turnoId, setFormData, auth.token]);

  const turnoUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('observaciones', formState.inputs.observaciones.value);

      const response = await sendRequest(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos/${turnoId}`,
        'PATCH',
        JSON.stringify({
          observaciones: formState.inputs.observaciones.value,
        }),
        {
          'Content-Type': 'application/json', // le decimos que le estamos enviando un json
          Authorization: 'Bearer ' + auth.token,
        }
      );

        //console.log(response.code);
      //return response;
      navigate('/turnos');
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

  if (isLoadingTurno) {
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
