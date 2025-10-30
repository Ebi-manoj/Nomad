import type { CreateJoinRequestDTO } from '@/types/hike';
import axiosInstance from '@/utils/axiosInstance';

export const CREATE_HIKE_API = '/hike/create';
export const FIND_MATCH_RIDES_API = '/hike/match-rides';
const JOIN_RIDE_API = '/hike/join-ride';

export const joinRide = async (data: CreateJoinRequestDTO): Promise<void> => {
  const res = await axiosInstance.post(JOIN_RIDE_API, data);
  return res.data.data;
};
