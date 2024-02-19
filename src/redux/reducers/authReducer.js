import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoggedIn: false,
  userId: null,
  token: null,
  rol: null,
  isLoading: false,
  error: null,
};

const getToken = (thunkAPI) => {
  const state = thunkAPI.getState();
  return state.auth.token;
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
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
        errorCode: error.response.status,
      });
    }
  }
);

export const createAdmin = createAsyncThunk(
  'auth/createAdmin',
  async (userData, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/usuarios/admin`;
    const token = getToken(thunkAPI);
    try {
      const response = await axios.post(url, userData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response.data);
      return response.data.usuario;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
        errorCode: error.response.status,
      });
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
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
        errorCode: error.response.status,
      });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('userData');
  return null;
});

export const sendAccountRecoveryEmail = createAsyncThunk(
  'auth/sendAccountRecoveryEmail',
  async (email, thunkAPI) => {
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/usuarios/email`;
    console.log(email);
    console.log(url);
    try {
      const response = await axios.post(
        url,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
        errorCode: error.response.status,
      });
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (formData, thunkAPI) => {
    const url = `${
      import.meta.env.VITE_REACT_APP_BACKEND_URL
    }/usuarios/reset-password`;
    console.log(url);
    try {
      const response = await axios.patch(
        url,
        { formData },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + formData.token,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response.data.message,
        errorCode: error.response.status,
      });
    }
  }
);

export const clearError = createAction('auth/clearError');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        // cambiar estas opciones, las dejé así para probar y agilizar el desarrollo
        state.isLoggedIn = true;
        state.userId = action.payload._id;
        state.token = action.payload.token;
        state.rol = action.payload.rol;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        console.log(action.payload);
        state.userId = action.payload.usuario._id;
        state.token = action.payload.token;
        state.rol = action.payload.usuario.rol;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.userId = null;
        state.token = null;
        state.rol = null;
      })
      .addCase(createAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userId = action.payload._id;
        state.token = action.payload.token;
        state.rol = action.payload.rol;
        state.isLoading = false;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(sendAccountRecoveryEmail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sendAccountRecoveryEmail.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(sendAccountRecoveryEmail.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(clearError, (state) => {
        state.error = null;
      });
  },
});

export default authSlice.reducer;
