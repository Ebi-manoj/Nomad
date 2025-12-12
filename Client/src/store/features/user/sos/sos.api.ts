import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type {
  SosContactsResDTO,
  SosContactDTO,
  DeleteSosContactResDTO,
} from '@/types/sos';
import { DELETE_SOS_API, EDIT_SOS_API, SOS_API } from '@/api/sos';

export async function fetchSosContactsApi(): Promise<SosContactDTO[]> {
  const res = await axiosInstance.get<ApiResponse<SosContactsResDTO>>(SOS_API);
  return res.data.data.contacts;
}

export async function addSosContactApi(
  contact: Omit<SosContactDTO, 'id'>
): Promise<SosContactDTO[]> {
  const res = await axiosInstance.post<ApiResponse<SosContactsResDTO>>(
    SOS_API,
    contact
  );
  return res.data.data.contacts;
}

export async function editSosContactApi(
  id: string,
  contact: Omit<SosContactDTO, 'id'>
) {
  const res = await axiosInstance.put<ApiResponse<SosContactDTO>>(
    EDIT_SOS_API(id),
    contact
  );
  return res.data.data;
}
export async function deleteSosContactApi(id: string) {
  const res = await axiosInstance.delete<ApiResponse<DeleteSosContactResDTO>>(
    DELETE_SOS_API(id)
  );
  return res.data.data;
}
