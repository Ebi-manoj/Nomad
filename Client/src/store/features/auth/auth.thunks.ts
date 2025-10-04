import {
  googleSignupApi,
  loginApi,
  logoutApi,
  refreshTokenApi,
} from './auth.api';
import type { loginFormData } from '@/validation/auth';
import { isAxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
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

export const googleSignup = createAsyncThunk(
  'auth/googleSignup',
  async (code: string, { rejectWithValue }) => {
    try {
      return await googleSignupApi(code);
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.error?.message || 'Login Failed'
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
