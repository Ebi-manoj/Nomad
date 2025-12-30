import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NotificationItem, NotificationsState } from './notification';

const initialState: NotificationsState = {
  unreadCount: 0,
  items: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setUnreadCount(state, action: PayloadAction<number>) {
      state.unreadCount = action.payload;
    },
    addNotification(state, action: PayloadAction<NotificationItem>) {
      state.items.unshift(action.payload);
      if (!action.payload.read) state.unreadCount += 1;
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
});

export const {
  setUnreadCount,
  addNotification,
  markAllAsRead,
  clearNotifications,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
