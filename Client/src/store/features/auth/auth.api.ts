import axiosInstance from '@/utils/axiosInstance';
import type { loginFormData } from '@/validation/auth';

export async function loginApi(data: loginFormData) {
  const res = await axiosInstance.post('/auth/login', data);
  return res.data.data;
}

export async function refreshTokenApi() {
  const res = await axiosInstance.get('/auth/refreshtoken');
  return res.data.data;
}

export async function logoutApi() {
  const res = await axiosInstance.post('/auth/logout');
  return res.data.data;
}
