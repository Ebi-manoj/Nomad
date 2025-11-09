import type { ApiResponse } from '@/types/ApiResponse';
import type {
  HikerPaymentInfoResponseDTO,
  paymentIntentRequestDTO,
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

export const createPaymentIntent = async (data: paymentIntentRequestDTO) => {
  const res = await axiosInstance.post<ApiResponse<paymentIntentResponseDTO>>(
    CREATE_PAYMENT_INTENT_API,
    data
  );
  return res.data.data;
};
