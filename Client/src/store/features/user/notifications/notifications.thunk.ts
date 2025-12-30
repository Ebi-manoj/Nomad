import { createAsyncThunk } from '@reduxjs/toolkit';
import { useHandleThunkError } from '@/hooks/useHandleThunkError';
import { CACHE_DURATION, ErrorMessage } from '@/utils/constants';
import type { NotificationItem } from './notification';
import { fetchNotificationsApi } from './notifications.api';
import type { RootState } from '@/store/store';

export const fetchNotifications = createAsyncThunk<
  NotificationItem[] | null,
  void,
  { state: RootState }
>(
  'notifications/fetchAll',
  async (_: void, { getState, rejectWithValue }) => {
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
      return useHandleThunkError(
        error,
        rejectWithValue,
        ErrorMessage.SOMETHING_WENT_WRONG
      );
    }
  }
);
