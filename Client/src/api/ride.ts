import type { ApiResponse } from '@/types/ApiResponse';
import type { RideRequestDTO } from '@/types/ride';
import axiosInstance from '@/utils/axiosInstance';

export const CREATE_RIDE_API = '/ride/create';
export const GET_JOIN_REQUESTS_API = (rideId: string) =>
  `/ride/join-request/${rideId}/pending`;

export async function getJoinRequest(rideId: string) {
  const res = await axiosInstance.get<ApiResponse<RideRequestDTO[]>>(
    GET_JOIN_REQUESTS_API(rideId)
  );
  return res.data.data;
}
