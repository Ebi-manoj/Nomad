import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NotificationItem, NotificationsState } from './notification';
import { fetchNotifications } from './notifications.thunk';

const initialState: NotificationsState = {
  unreadCount: 0,
  items: [],
  lastFetched: undefined,
  hasNewNotifications: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setUnreadCount(state, action: PayloadAction<number>) {
      state.unreadCount = action.payload;
    },
    setHasNewNotifications(state, action: PayloadAction<boolean>) {
      state.hasNewNotifications = action.payload;
    },
    addNotification(state, action: PayloadAction<NotificationItem>) {
      state.items.unshift(action.payload);
      if (!action.payload.read) state.unreadCount += 1;
      state.hasNewNotifications = true;
    },
    markAllAsRead(state) {
      state.items = state.items.map(n => ({ ...n, read: true }));
      state.unreadCount = 0;
    },
    clearNotifications(state) {
      state.items = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      if (action.payload) {
        state.items = action.payload;
        state.unreadCount = action.payload.filter(n => !n.read).length;
        state.lastFetched = Date.now();
        state.hasNewNotifications = false;
      }
    });
  },
});

export const {
  setUnreadCount,
  setHasNewNotifications,
  addNotification,
  markAllAsRead,
  clearNotifications,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
