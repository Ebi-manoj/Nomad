import type { ApiResponse } from '@/types/ApiResponse';
import type {
  CreateSubscriptionCheckoutSessionDTO,
  VerifySubscriptionResponse,
  GetSubscriptionDetailsResDTO,
  SubscriptionPlanDTO,
} from '@/types/subscription';
import axiosInstance from '@/utils/axiosInstance';

export const SUBSCRIPTION_CHECKOUT_API = '/subscriptions/checkout';
export const VERIFY_SUBSCRIPTION_API = '/subscriptions/verify';
export const SUBSCRIPTION_DETAILS_API = '/subscriptions';
export const SUBSCRIPTION_PLANS_API = '/subscriptions/plans';

export const getSubscriptionCheckout = async (
  data: CreateSubscriptionCheckoutSessionDTO
) => {
  const res = await axiosInstance.post<
    ApiResponse<{ id: string; url: string }>
  >(SUBSCRIPTION_CHECKOUT_API, data);
  return res.data.data;
};

export const verifySubscriptionApi = async (sessionId: string) => {
  const res = await axiosInstance.get<ApiResponse<VerifySubscriptionResponse>>(
    VERIFY_SUBSCRIPTION_API,
    {
      params: { session_id: sessionId },
    }
  );
  return res.data.data;
};

export const getSubscriptionDetailsApi = async () => {
  const res = await axiosInstance.get<
    ApiResponse<GetSubscriptionDetailsResDTO>
  >(SUBSCRIPTION_DETAILS_API);
  return res.data.data;
};
export const getSubscriptionPlansApi = async () => {
  const res = await axiosInstance.get<ApiResponse<SubscriptionPlanDTO>>(
    SUBSCRIPTION_PLANS_API
  );
  return res.data.data;
};
