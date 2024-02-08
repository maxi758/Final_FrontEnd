import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  fecha: null,
  estado: null,
  observaciones: null,
  medico: null,
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
    });
    builder.addCase(getTurnos.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default medicosSlice.reducer;
