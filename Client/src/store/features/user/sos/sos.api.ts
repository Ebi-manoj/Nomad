import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type { SosContactsResDTO, SosContactDTO } from '@/types/sos';

const SOS_API = '/user/sos';

export async function fetchSosContactsApi(): Promise<SosContactDTO[]> {
  const res = await axiosInstance.get<ApiResponse<SosContactsResDTO>>(SOS_API);
  return res.data.data.contacts;
}

export async function addSosContactApi(
  contact: SosContactDTO
): Promise<SosContactDTO[]> {
  const res = await axiosInstance.post<ApiResponse<SosContactsResDTO>>(
    SOS_API,
    contact
  );
  return res.data.data.contacts;
}
