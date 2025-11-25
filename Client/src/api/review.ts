import { useHandleApiError } from '@/hooks/useHandleApiError';
import type { ApiResponse } from '@/types/ApiResponse';
import type { RateUserReqDTO, RateUserResDTO } from '@/types/review';
import axiosInstance from '@/utils/axiosInstance';

export const rateUser = async (data: RateUserReqDTO) => {
  try {
    const res = await axiosInstance.post<ApiResponse<RateUserResDTO>>(
      '/review',
      data
    );
    return res.data.data;
  } catch (error) {
    useHandleApiError(error);
  }
};
