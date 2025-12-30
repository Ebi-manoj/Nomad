import type { ApiResponse } from '@/types/ApiResponse';
import axiosInstance from '@/utils/axiosInstance';
import type { NotificationItem } from './notification';

export async function fetchNotificationsApi() {
  const res = await axiosInstance.get<ApiResponse<NotificationItem[]>>(
    '/user/notifications'
  );
  return res.data.data;
}
