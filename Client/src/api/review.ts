import { handleApiError } from '@/utils/HandleApiError';
import type { ApiResponse } from '@/types/ApiResponse';
import type { RateUserReqDTO, ReviewResponseDTO } from '@/types/review';
import axiosInstance from '@/utils/axiosInstance';

export const rateUser = async (data: RateUserReqDTO) => {
  try {
    const res = await axiosInstance.post<ApiResponse<ReviewResponseDTO>>(
      '/review',
      data
    );
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
