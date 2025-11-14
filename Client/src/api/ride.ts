import type { ApiResponse } from '@/types/ApiResponse';
import type {
  AcceptJoinResponseDTO,
  DeclineJoinResponseDTO,
  RideRequestDTO,
} from '@/types/ride';
import type { Task } from '@/types/task';
import type { GetHikersMatchedResponseDTO } from '@/types/matchedHiker';
import axiosInstance from '@/utils/axiosInstance';

export const CREATE_RIDE_API = '/ride/create';
export const GET_JOIN_REQUESTS_API = (rideId: string) =>
  `/ride/join-request/${rideId}/pending`;

export const ACCEPT_JOIN_REQ_API = '/ride/join-request/accept';
export const DECLINE_JOIN_REQ_API = '/ride/join-request/decline';
export const GET_TASKS_API = '/task';
export const GET_HIKERS_MATCHED_API = (rideId: string) => `/ride/hikers-matched/${rideId}`;

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

export async function declineJoinRequest(id: string) {
  const res = await axiosInstance.patch<ApiResponse<DeclineJoinResponseDTO>>(
    DECLINE_JOIN_REQ_API,
    { joinRequestId: id }
  );
  return res.data.data;
}

export async function getTasks(rideId: string) {
  const res = await axiosInstance.get<ApiResponse<Task[]>>(GET_TASKS_API, {
    params: { rideId },
  });
  return res.data.data;
}

export async function getHikersMatched(rideId: string) {
  const res = await axiosInstance.get<ApiResponse<GetHikersMatchedResponseDTO[]>>(
    GET_HIKERS_MATCHED_API(rideId)
  );
  return res.data.data;
}
