import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type {
  GetUserProfileResDTO,
  UpdateUserProfileReqDTO,
  UpdateUserProfileResDTO,
} from '@/types/profile';
import { PRESIGNED_URL_API } from '@/api/documents';
import { FolderTypes } from '@/utils/constants';

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

export async function getProfileUploadPresignedUrl(
  fileName: string,
  fileType: string
) {
  const res = await axiosInstance.post<
    ApiResponse<{ uploadURL: string; fileURL: string }>
  >(PRESIGNED_URL_API, {
    fileName,
    fileType,
    type: FolderTypes.PROFILE,
  });
  return res.data.data;
}

export async function updateUserProfileImage(fileURL: string) {
  const res = await axiosInstance.patch<ApiResponse<UpdateUserProfileResDTO>>(
    '/user/profile/image',
    { fileURL }
  );
  return res.data.data;
}
