import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type {
  DashboardRange,
  RevenueOverviewDTO,
  RevenueSummaryDTO,
  RevenueTransactionDTO,
} from '@/types/adminRevenue';
import { handleApiError } from '@/utils/HandleApiError';

export const FETCH_ADMIN_REVENUE_API = '/admin/revenue';
export const FETCH_ADMIN_REVENUE_REPORT_API = '/admin/revenue/report';

export const getAdminRevenueOverview = async (
  range: DashboardRange,
  options?: {
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }
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
    handleApiError(error);
  }
};

export const getAdminRevenueReport = async (
  range: DashboardRange,
  options?: { startDate?: string; endDate?: string }
) => {
  try {
    const res = await axiosInstance.get<
      ApiResponse<{
        summary: RevenueSummaryDTO;
        transactions: RevenueTransactionDTO[];
      }>
    >(FETCH_ADMIN_REVENUE_REPORT_API, {
      params: {
        range,
        startDate: options?.startDate,
        endDate: options?.endDate,
      },
    });
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
