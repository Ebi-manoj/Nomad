import type { ApiResponse } from '@/types/ApiResponse';
import type { CreateSubscriptionCheckoutSessionDTO } from '@/types/subscription';
import axiosInstance from '@/utils/axiosInstance';

export const SUBSCRIPTION_CHECKOUT_API = '/subscriptions/checkout';

export const getSubscriptionCheckout = async (
  data: CreateSubscriptionCheckoutSessionDTO
) => {
  const res = await axiosInstance.post<
    ApiResponse<{ id: string; url: string }>
  >(SUBSCRIPTION_CHECKOUT_API, data);
  return res.data.data;
};
