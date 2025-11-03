import type { ApiResponse } from '@/types/ApiResponse';
import type { AcceptJoinResponseDTO, RideRequestDTO } from '@/types/ride';
import axiosInstance from '@/utils/axiosInstance';

export const CREATE_RIDE_API = '/ride/create';
export const GET_JOIN_REQUESTS_API = (rideId: string) =>
  `/ride/join-request/${rideId}/pending`;

export const ACCEPT_JOIN_REQ_API = '/ride/join-request/accept';

export async function getJoinRequest(rideId: string) {
  const res = await axiosInstance.get<ApiResponse<RideRequestDTO[]>>(
    GET_JOIN_REQUESTS_API(rideId)
  );
  return res.data.data;
}

export async function acceptJoinRequest(id: string) {
  const res = await axiosInstance.post<ApiResponse<AcceptJoinResponseDTO>>(
    ACCEPT_JOIN_REQ_API,
    { joinRequestId: id }
  );
  return res.data.data;
}
