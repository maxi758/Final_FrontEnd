import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initial_state = {
  isLoggedIn: false,
  userId: null,
  token: null,
  rol: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, url) => {
    try {
      const responseData = await axios.post(url, {
        user: userData,
      });
      return responseData.data.user;
    } catch (error) {}
  }
);
