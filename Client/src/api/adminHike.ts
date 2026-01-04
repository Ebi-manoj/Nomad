import { useHandleApiError } from '@/hooks/useHandleApiError';
import type { ApiResponse } from '@/types/ApiResponse';
import type {
  AdminHikeDetailsResDTO,
  GetAdminHikesResDTO,
} from '@/types/adminHike';
import axiosInstance from '@/utils/axiosInstance';

export const FETCH_ADMIN_HIKES_API = '/admin/hike';

export const getAdminHikes = async (
  page = 1,
  status = '',
  search = '',
  sort: 'newest' | 'oldest' = 'newest'
) => {
  try {
    const res = await axiosInstance.get<ApiResponse<GetAdminHikesResDTO>>(
      FETCH_ADMIN_HIKES_API,
      {
        params: { page, status, search, sort },
      }
    );
    return res.data.data;
  } catch (error) {
    useHandleApiError(error);
  }
};

const FETCH_ADMIN_HIKE_DETAILS_API = (hikeId: string) =>
  `${FETCH_ADMIN_HIKES_API}/${hikeId}`;

export const getAdminHikeDetails = async (hikeId: string) => {
  try {
    const res = await axiosInstance.get<ApiResponse<AdminHikeDetailsResDTO>>(
      FETCH_ADMIN_HIKE_DETAILS_API(hikeId)
    );
    return res.data.data;
  } catch (error) {
    useHandleApiError(error);
  }
};
