import { useHandleApiError } from '@/hooks/useHandleApiError';
import type { ApiResponse } from '@/types/ApiResponse';
import type { GetAdminHikesResDTO } from '@/types/adminHike';
import axiosInstance from '@/utils/axiosInstance';

export const FETCH_ADMIN_HIKES_API = '/admin/hike';

export const getAdminHikes = async (page = 1, status = '') => {
  try {
    const res = await axiosInstance.get<ApiResponse<GetAdminHikesResDTO>>(
      FETCH_ADMIN_HIKES_API,
      {
        params: { page, status },
      }
    );
    return res.data.data;
  } catch (error) {
    useHandleApiError(error);
  }
};
