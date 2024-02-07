import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

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

export const createMedico = createAsyncThunk(
  'medicos/createMedico',
  async (formData, token, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/medicos`;
    console.log(url);
    try {
      const response = await axios.post(url, formData, {
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
      .addCase(createMedico.fulfilled, (state, action) => {
        state.medico = action.payload;
        return state;
      })
      .addCase(createMedico.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default medicosSlice.reducer;
