import type { ApiResponse } from '@/types/ApiResponse';
import type {
  CreateJoinRequestDTO,
  GetHikeDetailsResponseDTO,
} from '@/types/hike';
import axiosInstance from '@/utils/axiosInstance';

export const CREATE_HIKE_API = '/hike/create';
export const FIND_MATCH_RIDES_API = '/hike/match-rides';
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
