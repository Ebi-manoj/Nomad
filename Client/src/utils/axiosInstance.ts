import { useAppDispatch } from '@/hooks/useAppDispatch';
import { logout, refreshToken } from '@/store/features/auth/auth.thunks';
import type { Store } from '@reduxjs/toolkit';
import axios from 'axios';
let store: Store;

export const injectStore = (_store: Store) => (store = _store);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const dispatch = useAppDispatch();
      try {
        await dispatch(refreshToken()).unwrap();
        const state = store.getState();
        const token = state.auth.token;

        originalRequest.headers.Authorization = `Bearer ${token}`;
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
