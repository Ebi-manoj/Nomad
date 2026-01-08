import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type { UserDashboardDTO } from '@/types/userDashboard';
import { handleApiError } from '@/utils/HandleApiError';

export const FETCH_USER_DASHBOARD_API = '/user/insights';

export const getUserDashboardOverview = async () => {
  try {
    const res = await axiosInstance.get<ApiResponse<UserDashboardDTO>>(
      FETCH_USER_DASHBOARD_API
    );
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
