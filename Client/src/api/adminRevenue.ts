import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type { DashboardRange, RevenueOverviewDTO } from '@/types/adminRevenue';
import { useHandleApiError } from '@/hooks/useHandleApiError';

export const FETCH_ADMIN_REVENUE_API = '/admin/revenue';

export const getAdminRevenueOverview = async (
  range: DashboardRange,
  options?: { startDate?: string; endDate?: string; page?: number; limit?: number }
) => {
  try {
    const res = await axiosInstance.get<ApiResponse<RevenueOverviewDTO>>(
      `${FETCH_ADMIN_REVENUE_API}`,
      {
        params: {
          range,
          startDate: options?.startDate,
          endDate: options?.endDate,
          page: options?.page,
          limit: options?.limit,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    useHandleApiError(error);
  }
};
