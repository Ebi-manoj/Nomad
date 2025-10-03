import type { AuthState } from '@/types/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi, logoutApi, refreshTokenApi } from './auth.api';
import type { loginFormData } from '@/validation/auth';
import { isAxiosError } from 'axios';

const initialState: AuthState = {
  loading: false,
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

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_: void, { rejectWithValue }) => {
    try {
      return await refreshTokenApi();
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.error?.message || 'Session expired'
        );
      }
      return rejectWithValue(
        'Unable to connect to the server. Please try again.'
      );
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_: void, { rejectWithValue }) => {
    try {
      return await logoutApi();
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.error?.message || 'Logout Failed'
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
    builder.addCase(refreshToken.pending, state => {
      state.loading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      state.loading = false;
    });
    builder.addCase(refreshToken.rejected, state => {
      state.token = null;
      state.user = null;
      state.loading = false;
    });
    builder.addCase(logout.fulfilled, state => {
      state.token = null;
      state.user = null;
    });
  },
});

export default authSlice.reducer;
