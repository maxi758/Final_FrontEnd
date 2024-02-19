import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  nombre: '',
  apellido: '',
  especialidad: '',
  matricula: '',
  isLoading: false,
  medicos: [],
  error: null,
  total: 0,
  totalPages: 1,
};

const updatePagination = (state) => {
  state.total = Object.keys(state.medicos).length;
  if (state.total === 0) {
    state.totalPages = 1;
    return;
  }
  state.totalPages = Math.ceil(state.total / 10);
};

const getToken = (thunkAPI) => {
  const state = thunkAPI.getState();
  return state.auth.token;
};

export const getMedicos = createAsyncThunk(
  'medicos/getMedicos',
  async (page = 1, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos?page=${page}`;
    const token = getToken(thunkAPI);
    console.log('url', url);
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
        errorCode: error.response.status,
      });
    }
  }
);

export const getMedicoById = createAsyncThunk(
  'medicos/getMedicoById',
  async ({ data }, thunkAPI) => {
    console.log(data);
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos/${
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
      return response.data.medico;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
        errorCode: error.response.status,
      });
    }
  }
);

export const createMedico = createAsyncThunk(
  'medicos/createMedico',
  async ({ formData, token }, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos`;
    console.log(url);
    console.log('form', formData);
    console.log(token);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response);
      return response.data.medico;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
        errorCode: error.response.status,
      });
    }
  }
);

export const updateMedico = createAsyncThunk(
  'medicos/updateMedico',
  async ({ formData, token }, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos/${
      formData.id
    }`;
    console.log(url);
    console.log('form', formData);
    console.log(token);
    try {
      const response = await axios.patch(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response);
      return response.data.medico;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
        errorCode: error.response.status,
      });
    }
  }
);

export const deleteMedico = createAsyncThunk(
  'medicos/deleteMedico',
  async ({ id, token }, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos/${id}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response);
      return id;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
        errorCode: error.response.status,
      });
    }
  }
);

export const clearError = createAction('medicos/clearError');

const medicosSlice = createSlice({
  name: 'medicos',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMedicos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMedicos.fulfilled, (state, action) => {
        state.medicos = action.payload.medicos;
        state.total = action.payload.total;
        if (action.payload.totalPages > 1) {
          state.totalPages = action.payload.totalPages;
        }
        state.isLoading = false;
        return state;
      })
      .addCase(getMedicos.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(createMedico.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createMedico.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medicos.push(action.payload);
        updatePagination(state);
        return state;
      })
      .addCase(createMedico.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(getMedicoById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMedicoById.fulfilled, (state, action) => {
        state.loadedMedico = action.payload;
        state.isLoading = false;
        return state;
      })
      .addCase(getMedicoById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(updateMedico.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateMedico.fulfilled, (state, action) => {
        state.loadedMedico = action.payload;
        state.medicos = state.medicos.map((medico) =>
          medico._id === action.payload._id ? action.payload : medico
        );
        state.isLoading = false;
        return state;
      })
      .addCase(updateMedico.rejected, (state, action) => {
        state.error = action.payload;
        console.log;
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(deleteMedico.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteMedico.fulfilled, (state, action) => {
        state.medicos = state.medicos.filter(
          (medico) => medico._id !== action.payload
        );
        updatePagination(state);
        state.isLoading = false;
        return state;
      })
      .addCase(deleteMedico.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(clearError, (state) => {
        state.error = null;
      });
  },
});

export default medicosSlice.reducer;
export const selectMedicos = (state) => state.medicos.medicos;
