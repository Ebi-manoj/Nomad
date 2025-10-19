import axiosInstance from '@/utils/axiosInstance';
import type { CreateRideDTO } from './ride';
import { CREATE_RIDE_API } from '@/api/ride';

export async function createRideApi(data: CreateRideDTO) {
  const res = await axiosInstance.post(CREATE_RIDE_API, data);
  return res.data.data;
}
