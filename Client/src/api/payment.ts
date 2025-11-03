import type { ApiResponse } from '@/types/ApiResponse';
import type { HikerPaymentInfoResponseDTO } from '@/types/payment';
import axiosInstance from '@/utils/axiosInstance';

export const GET_HIKE_PAYMENT_API = (paymentId: string) =>
  `/payments/hike/${paymentId}`;

export const getHikePayment = async function (paymentId: string) {
  const res = await axiosInstance.get<ApiResponse<HikerPaymentInfoResponseDTO>>(
    GET_HIKE_PAYMENT_API(paymentId)
  );
  return res.data.data;
};
