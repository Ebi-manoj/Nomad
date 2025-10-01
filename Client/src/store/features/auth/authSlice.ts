import type { AuthState } from '@/types/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi } from './auth.api';
import type { loginFormData } from '@/validation/auth';
import { isAxiosError } from 'axios';

const initialState: AuthState = {
  token: null,
  user: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: loginFormData, { rejectWithValue }) => {
    try {
      return await loginApi(data);
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.error?.message ||
            'An error occurred during sign in'
        );
      }
      return rejectWithValue(
        'Unable to connect to the server. Please try again.'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, state => {
      state.token = null;
      state.user = null;
    });
  },
});

export default authSlice.reducer;
