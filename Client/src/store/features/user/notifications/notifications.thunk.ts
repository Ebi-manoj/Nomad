import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleThunkError } from '@/utils/HandleThunkError';
import { CACHE_DURATION, ErrorMessage } from '@/utils/constants';
import type { NotificationItem } from './notification';
import { fetchNotificationsApi, markAllAsReadApi } from './notifications.api';
import type { RootState } from '@/store/store';

export const fetchNotifications = createAsyncThunk<
  NotificationItem[] | null,
  void,
  { state: RootState }
>('notifications/fetchAll', async (_: void, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const now = Date.now();
    if (
      state.notifications.lastFetched &&
      now - state.notifications.lastFetched < CACHE_DURATION &&
      !state.notifications.hasNewNotifications
    ) {
      return null;
    }

    const data = await fetchNotificationsApi();
    return data;
  } catch (error) {
    return handleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});

export const markAllNotificationsRead = createAsyncThunk<
  { unreadCount: number },
  void,
  { state: RootState }
>('notifications/markAllRead', async (_: void, { rejectWithValue }) => {
  try {
    const data = await markAllAsReadApi();
    return data;
  } catch (error) {
    return handleThunkError(
      error,
      rejectWithValue,
      ErrorMessage.SOMETHING_WENT_WRONG
    );
  }
});
