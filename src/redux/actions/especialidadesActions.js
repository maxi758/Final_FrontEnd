import axios from 'axios';

export const FETCH_ESPECIALIDADES_START = 'FETCH_ESPECIALIDADES_START';
export const FETCH_ESPECIALIDADES_SUCCESS = 'FETCH_ESPECIALIDADES_SUCCESS';
export const FETCH_ESPECIALIDADES_FAIL = 'FETCH_ESPECIALIDADES_FAIL';

export const fetchEspecialidadesStart = () => {
  return {
    type: FETCH_ESPECIALIDADES_START,
  };
};

export const fetchEspecialidadesSuccess = (especialidades) => {
  return {
    type: FETCH_ESPECIALIDADES_SUCCESS,
    payload: especialidades,
  };
};

export const fetchEspecialidadesFail = (error) => {
  return {
    type: FETCH_ESPECIALIDADES_FAIL,
    payload: error,
  };
};

export const fetchEspecialidades = (url, token) => {
  return async (dispatch) => {
    dispatch(fetchEspecialidadesStart());
    try {
      console.log('fetching especialidades');
      const responseData = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log('Response from fetch', responseData.data.especialidades);
      dispatch(fetchEspecialidadesSuccess(responseData.data.especialidades));
    } catch (err) {
      console.log('error', err);
      dispatch(fetchEspecialidadesFail(err));
    }
  };
};
