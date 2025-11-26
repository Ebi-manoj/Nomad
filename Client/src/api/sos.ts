import type { TriggerSosHikerDTO, TriggerSosRiderDTO } from '@/types/sos';
import axiosInstance from '@/utils/axiosInstance';

export const triggerSosHiker = async (data: TriggerSosHikerDTO) => {
  const res = await axiosInstance.post('/user/sos/trigger', data);
  return res.data.data;
};
export const triggerSosRider = async (data: TriggerSosRiderDTO) => {
  const res = await axiosInstance.post('/user/sos/trigger/ride', data);
  return res.data.data;
};
