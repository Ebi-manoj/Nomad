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
export default axiosInstance;
