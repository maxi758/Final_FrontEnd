import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  turnos: [],
  loadedTurno: {
    fecha: null,
    estado: null,
    observaciones: null,
    medico: '',
    paciente: '',
  },
  turnosUsuario: [],
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
    console.log(url);
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
  async ({ data }, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos/${
      data.id
    }`;
    console.log(url);
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token,
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

export const createTurno = createAsyncThunk(
  'turnos/createTurno',
  async ({ formData, token }, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/turnos`;
    console.log(url);
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
    console.log(url);
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
    const url = `${
      import.meta.env.VITE_REACT_APP_BACKEND_URL
    }/turnos/pacientes/${userId}?estado=${estado}`;
    const token = getToken(thunkAPI);
    console.log(url);
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log('response',response);
      return response.data.turnos;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const medicosSlice = createSlice({
  name: 'turnos',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTurnos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTurnos.fulfilled, (state, action) => {
      state.turnos = action.payload;
      state.loading = false;
      return state;
    });
    builder.addCase(getTurnos.rejected, (state, action) => {
      //state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getTurnoById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTurnoById.fulfilled, (state, action) => {
      state.loadedTurno = action.payload;
      state.loading = false;
      return state;
    });
    builder.addCase(getTurnoById.rejected, (state, action) => {
      //state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(createTurno.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createTurno.fulfilled, (state, action) => {
      state.turnos.push(action.payload);
      state.loading = false;
      return state;
    });
    builder.addCase(createTurno.rejected, (state, action) => {
      //state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(updateTurno.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTurno.fulfilled, (state, action) => {
      state.loadedTurno = action.payload;
      state.turnos = state.turnos.map((turno) =>
        turno._id === action.payload._id ? action.payload : turno
      );
      state.loading = false;
      return state;
    });
    builder.addCase(updateTurno.rejected, (state, action) => {
      //state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getTurnoByUsuario.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTurnoByUsuario.fulfilled, (state, action) => {
      state.turnosUsuario = action.payload;
      state.loading = false;
      return state;
    });
    builder.addCase(getTurnoByUsuario.rejected, (state, action) => {
      //state.error = action.payload;
      state.loading = false;
    });
  },
});

export default medicosSlice.reducer;
