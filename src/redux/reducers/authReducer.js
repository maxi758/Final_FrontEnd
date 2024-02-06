import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoggedIn: false,
  userId: null,
  token: null,
  rol: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/usuarios`;
    console.log(userData);
    console.log(url);
    try {
      const response = await axios.post(url, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data.usuario;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/usuarios/login`;
    console.log(userData);
    console.log(url);
    try {
      const response = await axios.post(url, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userId = action.payload._id;
        state.token = action.payload.token;
        state.rol = action.payload.rol;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userId = action.payload.usuario._id;
        state.token = action.payload.token;
        state.rol = action.payload.usuario.rol;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default authSlice.reducer;
