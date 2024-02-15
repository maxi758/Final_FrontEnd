import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  createSelector,
  createAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

const turnosAdapter = createEntityAdapter({
  selectId: (turno) => turno._id,

  sortComparer: (a, b) => a.fecha.localeCompare(b.fecha),
});
const initialState = turnosAdapter.getInitialState({
  isLoading: false,
  turnosDisponibles: [],
  loadedTurno: {
    fecha: null,
    estado: null,
    observaciones: null,
    medico: '',
    paciente: '',
    _id: '',
  },
  turnosActivosUsuario: [],
  turnosCanceladosUsuario: [],
  turnosMedico: [],
  medicoID: '',
  error: null
});

const getState = (thunkAPI) => {
  const state = thunkAPI.getState();
  return state;
};

const getToken = (thunkAPI) => {
  const state = thunkAPI.getState();
  return state.auth.token;
};

const getUserId = (thunkAPI) => {
  const state = thunkAPI.getState();
  return state.auth.userId;
};

export const getTurnos = createAsyncThunk(
  'turnos/getTurnos',
  async (token, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response);
      return response.data.turnos;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTurnoById = createAsyncThunk(
  'turnos/getTurnoById',
  async ( data , thunkAPI) => {
    console.log(data);
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos/${
      data.data.id
    }`;
    console.log(url);
    console.log(data.token);
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.data.token,
        },
      });
      console.log(response);
      return response.data.turno;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createTurno = createAsyncThunk(
  'turnos/createTurno',
  async ({ formData, token }, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response);
      return response.data.turno;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTurno = createAsyncThunk(
  'turnos/updateTurno',
  async ({ formData, token }, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos/${
      formData.id
    }`;
    try {
      const response = await axios.patch(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response);
      return response.data.turno;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTurnoByUsuario = createAsyncThunk(
  'turnos/getTurnoByUsuario',
  async (estado, thunkAPI) => {
    const userId = getUserId(thunkAPI);
    let url;
    if (estado === 'CANCELADO') {
      url = `${
        import.meta.env.VITE_REACT_APP_BACKEND_URL
      }/turnos/pacientes/${userId}/cancelados`;
    } else {
      url = `${
        import.meta.env.VITE_REACT_APP_BACKEND_URL
      }/turnos/pacientes/${userId}?estado=${estado}`;
    }
    const token = getToken(thunkAPI);
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log('response', response);
      return response.data.turnos;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTurnoByMedico = createAsyncThunk(
  'turnos/getTurnoByMedico',
  async (id, thunkAPI) => {
    const url = `${
      import.meta.env.VITE_REACT_APP_BACKEND_URL
    }/turnos/medicos/${id}?estado=DISPONIBLE`;
    const token = getToken(thunkAPI);
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log('response', response);
      return response.data.turnos;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const asignTurno = createAsyncThunk(
  'turnos/asignTurno',
  async (id, thunkAPI) => {
    const token = getToken(thunkAPI);
    const url = `${
      import.meta.env.VITE_REACT_APP_BACKEND_URL
    }/turnos/${id}/reservar`;
    try {
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      console.log(response);
      return response.data.turno;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const cancelTurno = createAsyncThunk(
  'turnos/cancelTurno',
  async (id, thunkAPI) => {
    const token = getToken(thunkAPI);
    const url = `${
      import.meta.env.VITE_REACT_APP_BACKEND_URL
    }/turnos/${id}/cancelar`;
    try {
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      console.log(response);
      return response.data.turno;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTurno = createAsyncThunk(
  'turnos/deleteTurno',
  async (id, thunkAPI) => {
    const token = getToken(thunkAPI);
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos/${id}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response);
      return response.data.turno;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const clearError = createAction('turnos/clearError');

const turnosSlice = createSlice({
  name: 'turnos',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTurnos.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getTurnos.fulfilled, (state, action) => {
      turnosAdapter.setAll(state, action.payload);
      state.isLoading = false;
      return state;
    })
    .addCase(getTurnos.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(getTurnoById.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getTurnoById.fulfilled, (state, action) => {
      state.loadedTurno = action.payload;
      console.log('loaded', state.loadedTurno)
      state.isLoading = false;
      return state;
    })
    .addCase(getTurnoById.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(createTurno.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(createTurno.fulfilled, (state, action) => {
      console.log('action.payload', action.payload);
      turnosAdapter.addOne(state, action.payload);
      state.isLoading = false;
      return state;
    })
    .addCase(createTurno.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(updateTurno.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(updateTurno.fulfilled, (state, action) => {
      state.loadedTurno = action.payload;
      turnosAdapter.upsertOne(state, action.payload);
      /*state.turnos = state.turnos.map((turno) =>
        turno._id === action.payload._id ? action.payload : turno
      );*/
      state.isLoading = false;
      return state;
    })
    .addCase(updateTurno.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(getTurnoByUsuario.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getTurnoByUsuario.fulfilled, (state, action) => {
      if (action.meta.arg === 'CANCELADO') {
        state.turnosCanceladosUsuario = action.payload;
      } else {
        state.turnosActivosUsuario = action.payload;
      }
      state.isLoading = false;
      return state;
    })
    .addCase(getTurnoByUsuario.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(getTurnoByMedico.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getTurnoByMedico.fulfilled, (state, action) => {
      state.turnosMedico = action.payload;
      state.isLoading = false;
      return state;
    })
    .addCase(getTurnoByMedico.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(asignTurno.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(asignTurno.fulfilled, (state, action) => {
      state.loadedTurno = action.payload;
      turnosAdapter.removeOne(state, action.payload._id);
      state.turnosMedico = state.turnosMedico.filter(
        (turno) => turno._id !== action.payload._id
      );
      state.turnosActivosUsuario.push(action.payload);
      state.isLoading = false;
      return state;
    })
    .addCase(asignTurno.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(cancelTurno.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(cancelTurno.fulfilled, (state, action) => {
      state.loadedTurno = action.payload;
      state.turnosActivosUsuario = state.turnosActivosUsuario.filter(
        (turno) => turno._id !== action.payload._id
      );
      state.turnosCanceladosUsuario.push(action.payload);
      state.isLoading = false;
      return state;
    })
    .addCase(cancelTurno.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(deleteTurno.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(deleteTurno.fulfilled, (state, action) => {
      turnosAdapter.removeOne(state, action.payload._id);
      state.isLoading = false;
      return state;
    })
    .addCase(deleteTurno.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(clearError, (state) => {
      state.error = null;
    });

  },
});

export default turnosSlice.reducer;

export const {
  selectAll: selectAllTurnos,
  selectById: selectTurnoById,
  selectIds: selectTurnoIds
} = turnosAdapter.getSelectors((state) => state.turnos);
