import type { TriggerSosHikerDTO, TriggerSosRiderDTO } from '@/types/sos';
import axiosInstance from '@/utils/axiosInstance';

export const SOS_API = '/user/sos';
export const EDIT_SOS_API = (id: string) => `/user/sos/${id}`;
export const DELETE_SOS_API = (id: string) => `/user/sos/${id}`;
const TRIGGER_SOS_API = '/user/sos/trigger';

export const triggerSosHiker = async (data: TriggerSosHikerDTO) => {
  const res = await axiosInstance.post(TRIGGER_SOS_API, data);
  return res.data.data;
};
export const triggerSosRider = async (data: TriggerSosRiderDTO) => {
  const res = await axiosInstance.post(`${TRIGGER_SOS_API}/ride`, data);
  return res.data.data;
};
