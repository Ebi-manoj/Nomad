import type { AdminAuthState } from '@/types/auth';
import type { loginFormData } from '@/validation/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { adminLoginApi } from './adminAuth.api';
import { isAxiosError } from 'axios';

const initialState: AdminAuthState = {
  loading: false,
  token: null,
  admin: null,
};

export const adminLogin = createAsyncThunk(
  'adminauth/login',
  async (data: loginFormData, { rejectWithValue }) => {
    try {
      return await adminLoginApi(data);
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

const AdminAuthSlice = createSlice({
  name: 'adminauth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.accessToken;
      state.admin = action.payload.admin;
    });
  },
});

export default AdminAuthSlice.reducer;
