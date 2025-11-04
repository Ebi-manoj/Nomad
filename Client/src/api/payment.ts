import type { ApiResponse } from '@/types/ApiResponse';
import type {
  HikerPaymentInfoResponseDTO,
  paymentIntentResponseDTO,
} from '@/types/payment';
import axiosInstance from '@/utils/axiosInstance';

export const GET_HIKE_PAYMENT_API = (paymentId: string) =>
  `/payments/hike/${paymentId}`;
export const CREATE_PAYMENT_INTENT_API = '/payments/create-intent';

export const getHikePayment = async function (paymentId: string) {
  const res = await axiosInstance.get<ApiResponse<HikerPaymentInfoResponseDTO>>(
    GET_HIKE_PAYMENT_API(paymentId)
  );
  return res.data.data;
};

export const createPaymentIntent = async (
  amount: number,
  currency = 'inr',
  metadata = {}
) => {
  const res = await axiosInstance.post<ApiResponse<paymentIntentResponseDTO>>(
    CREATE_PAYMENT_INTENT_API,
    {
      amount,
      currency,
      metadata,
    }
  );
  return res.data.data;
};
