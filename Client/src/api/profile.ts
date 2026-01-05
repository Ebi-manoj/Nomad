import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type { GetUserProfileResDTO } from '@/types/profile';

export async function fetchUserProfile() {
  const res = await axiosInstance.get<ApiResponse<GetUserProfileResDTO>>(
    '/user/profile'
  );
  return res.data.data;
}
