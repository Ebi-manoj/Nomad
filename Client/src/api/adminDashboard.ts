import { useHandleApiError } from '@/hooks/useHandleApiError';
import type { ApiResponse } from '@/types/ApiResponse';
import type { DashboardOverviewDTO, DashboardRange } from '@/types/adminDashboard';
import axiosInstance from '@/utils/axiosInstance';

export const FETCH_ADMIN_DASHBOARD_API = '/admin/dashboard';

export const getAdminDashboardOverview = async (range: DashboardRange) => {
  try {
    const res = await axiosInstance.get<ApiResponse<DashboardOverviewDTO>>(
      FETCH_ADMIN_DASHBOARD_API,
      { params: { range } }
    );
    return res.data.data;
  } catch (error) {
    useHandleApiError(error);
  }
};
