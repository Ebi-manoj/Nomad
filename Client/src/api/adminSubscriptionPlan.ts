import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type {
  AdminSubscriptionPlanDTO,
  CreateSubscriptionPlanDTO,
} from '@/types/adminSubscription';

export const ADMIN_SUBSCRIPTION_PLANS_API = '/admin/subscription-plans';

export const getAdminSubscriptionPlansApi = async () => {
  const res = await axiosInstance.get<ApiResponse<AdminSubscriptionPlanDTO[]>>(
    ADMIN_SUBSCRIPTION_PLANS_API
  );
  return res.data.data;
};

export const createSubscriptionPlanApi = async (
  data: CreateSubscriptionPlanDTO
) => {
  const res = await axiosInstance.post<ApiResponse<AdminSubscriptionPlanDTO>>(
    ADMIN_SUBSCRIPTION_PLANS_API,
    data
  );
  return res.data.data;
};
