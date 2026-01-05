import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type {
  GetUserProfileResDTO,
  UpdateUserProfileReqDTO,
  UpdateUserProfileResDTO,
} from '@/types/profile';

export async function fetchUserProfile() {
  const res = await axiosInstance.get<ApiResponse<GetUserProfileResDTO>>(
    '/user/profile'
  );
  return res.data.data;
}

export async function updateUserProfile(dto: UpdateUserProfileReqDTO) {
  const res = await axiosInstance.patch<ApiResponse<UpdateUserProfileResDTO>>(
    '/user/profile',
    dto
  );
  return res.data.data;
}
