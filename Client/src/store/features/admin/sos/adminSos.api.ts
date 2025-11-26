import axiosInstance from '@/utils/axiosInstance';
import type { FetchAdminSosQuery } from './adminSos.d';
import { FETCH_SOS_LOGS_API, RESOLVE_SOS_API } from '@/api/adminSos';

export async function fetchAdminSosApi(query: FetchAdminSosQuery) {
  const res = await axiosInstance.get(FETCH_SOS_LOGS_API, { params: query });
  return res.data.data;
}
export async function resolveSosApi(id: string) {
  const res = await axiosInstance.patch(RESOLVE_SOS_API(id));
  return res.data.data;
}
