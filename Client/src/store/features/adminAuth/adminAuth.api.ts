import axiosInstance from '@/utils/axiosInstance';
import type { loginFormData } from '@/validation/auth';

export async function adminLoginApi(data: loginFormData) {
  const res = await axiosInstance.post('/admin/login', data);
  return res.data.data;
}
