import { handleApiError } from '@/utils/HandleApiError';
import type { ApiResponse } from '@/types/ApiResponse';
import type {
  CreateJoinRequestDTO,
  GetHikeDetailsResponseDTO,
  GetHikesResDTO,
} from '@/types/hike';
import axiosInstance from '@/utils/axiosInstance';

export const CREATE_HIKE_API = '/hike/create';
export const FIND_MATCH_RIDES_API = '/hike/match-rides';
export const CANCEL_HIKE_API = '/hike/cancel';
const JOIN_RIDE_API = '/hike/join-ride';
const GET_HIKE_DETAILS_API = (hikeId: string) => `/hike/${hikeId}`;

export const joinRide = async (data: CreateJoinRequestDTO) => {
  const res = await axiosInstance.post(JOIN_RIDE_API, data);
  return res.data.data;
};

export const getHikeDetails = async (hikeId: string) => {
  const res = await axiosInstance.get<ApiResponse<GetHikeDetailsResponseDTO>>(
    GET_HIKE_DETAILS_API(hikeId)
  );
  return res.data.data;
};

export const getHikes = async (page = 1, status = '', search = '') => {
  try {
    const res = await axiosInstance.get<ApiResponse<GetHikesResDTO>>('/hike', {
      params: { page, status, search },
    });
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const cancelHike = async (hikeId: string) => {
  const res = await axiosInstance.post<
    ApiResponse<{ hikeId: string; status: string }>
  >(CANCEL_HIKE_API, { hikeId });
  return res.data.data;
};
