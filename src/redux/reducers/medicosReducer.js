import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  nombre: '',
  apellido: '',
  especialidad: '',
  matricula: '',
};

export const getMedicos = createAsyncThunk(
  'medicos/getMedicos',
  async (token, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos`;
    console.log(url);
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response);
      return response.data.medicos;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateMedico = createAsyncThunk(
  'medicos/updateMedico',
  async ({ formData, token }, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos/${formData.id}`;
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const medicosSlice = createSlice({
  name: 'medicos',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMedicos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMedicos.fulfilled, (state, action) => {
        state.medicos = action.payload;
        state.isLoading = false;
        return state;
      })
      .addCase(getMedicos.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(createMedico.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createMedico.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medicos.push(action.payload);
        return state;
      })
      .addCase(createMedico.rejected, (state, action) => {
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
        console.log(action.payload);
      });
  },
});

export default medicosSlice.reducer;
