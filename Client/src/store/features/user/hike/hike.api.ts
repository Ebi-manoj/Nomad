import { CREATE_HIKE_API } from '@/api/hike';
import type { CreateHikeDTO } from './hike';
import axiosInstance from '@/utils/axiosInstance';

export async function createHikeApi(data: CreateHikeDTO) {
  const res = await axiosInstance.post(CREATE_HIKE_API, data);
  return res.data.data;
}
