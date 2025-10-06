import type { PaginationDTO } from '@/types/pagination';
import axiosInstance from '@/utils/axiosInstance';

export async function fetchUsersAPI(data: PaginationDTO) {
  console.log(data);
  const res = await axiosInstance.get('/admin/users', { params: data });
  return res.data.data;
}

export async function toggleBlockAPI(data: string) {
  const res = await axiosInstance.patch(`/admin/users/${data}/block`);
  return res.data.data;
}
