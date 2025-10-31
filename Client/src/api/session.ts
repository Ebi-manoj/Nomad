import type { HikeResponseDTO } from '@/store/features/user/hike/hike';
import type { RideData } from '@/store/features/user/ride/ride';
import axiosInstance from '@/utils/axiosInstance';

export const GET_ACTIVE_SESSION_API = '/user/session/active';

export interface activeSessionData {
  activeRide: RideData | null;
  activeHike: HikeResponseDTO | null;
}

export async function getActiveSession(): Promise<activeSessionData> {
  const res = await axiosInstance.get(GET_ACTIVE_SESSION_API);
  return res.data.data;
}
