import { logout, refreshToken } from '@/store/features/auth/auth.thunks';
import type { AppDispatch } from '@/store/store';
import type { Store } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorMessage } from './constants';
let store: Store;

export const injectStore = (_store: Store) => (store = _store);

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const state = store.getState();
    const token = state.auth.token;
    console.log(error);
    const dispatch: AppDispatch = store.dispatch;
    if (
      error.response?.status === 403 &&
      error.response?.data?.error?.message == ErrorMessage.USER_BLOCKED
    ) {
      await dispatch(logout()).unwrap();
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && token && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await dispatch(refreshToken()).unwrap();
        const newToken = store.getState().auth.token;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        await dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
