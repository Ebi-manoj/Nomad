import { handleApiError } from '@/utils/HandleApiError';
import type { ApiResponse } from '@/types/ApiResponse';
import type {
  AdminRideDetailsResDTO,
  GetAdminRidesResDTO,
} from '@/types/adminRide';
import axiosInstance from '@/utils/axiosInstance';

export const FETCH_ADMIN_RIDES_API = '/admin/ride';

export const getAdminRides = async (
  page = 1,
  status = '',
  search = '',
  sort: 'newest' | 'oldest' = 'newest'
) => {
  try {
    const res = await axiosInstance.get<ApiResponse<GetAdminRidesResDTO>>(
      FETCH_ADMIN_RIDES_API,
      {
        params: { page, status, search, sort },
      }
    );
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

const FETCH_ADMIN_RIDE_DETAILS_API = (rideId: string) =>
  `${FETCH_ADMIN_RIDES_API}/${rideId}`;

export const getAdminRideDetails = async (rideId: string) => {
  try {
    const res = await axiosInstance.get<ApiResponse<AdminRideDetailsResDTO>>(
      FETCH_ADMIN_RIDE_DETAILS_API(rideId)
    );
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
