import {
  googleSignupApi,
  loginApi,
  logoutApi,
  refreshTokenApi,
} from './auth.api';
import type { loginFormData } from '@/validation/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleThunkError } from '@/utils/HandleThunkError';
import { ErrorMessage } from '@/utils/constants';

export const login = createAsyncThunk(
  'auth/login',
  async (data: loginFormData, { rejectWithValue }) => {
    try {
      return await loginApi(data);
    } catch (error) {
      return handleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SIGNIN_ERROR
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
      return handleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SESSION_EXPIRED
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
      return handleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.LOGIN_FAILED
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
      return handleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.LOGOUT_FAILED
      );
    }
  }
);
