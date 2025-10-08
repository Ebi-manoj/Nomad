import type { AuthState } from '@/types/auth';
import { createSlice } from '@reduxjs/toolkit';
import { googleSignup, login, logout, refreshToken } from './auth.thunks';

const initialState: AuthState = {
  loading: false,
  token: null,
  user: null,
};

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
    builder.addCase(googleSignup.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(googleSignup.rejected, state => {
      state.token = null;
      state.user = null;
    });
  },
});

export default authSlice.reducer;
