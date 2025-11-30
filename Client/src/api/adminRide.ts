import { useHandleApiError } from '@/hooks/useHandleApiError';
import type { ApiResponse } from '@/types/ApiResponse';
import type { GetAdminRidesResDTO } from '@/types/adminRide';
import axiosInstance from '@/utils/axiosInstance';

export const FETCH_ADMIN_RIDES_API = '/admin/ride';

export const getAdminRides = async (page = 1, status = '') => {
  try {
    const res = await axiosInstance.get<ApiResponse<GetAdminRidesResDTO>>(
      FETCH_ADMIN_RIDES_API,
      {
        params: { page, status },
      }
    );
    return res.data.data;
  } catch (error) {
    useHandleApiError(error);
  }
};
