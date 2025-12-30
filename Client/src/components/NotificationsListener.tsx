import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useSocket } from '@/context/SocketContext';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setUnreadCount } from '@/store/features/user/notifications/notificationsSlice';

export function NotificationsListener() {
  const dispatch = useAppDispatch();
  const { userSocket } = useSocket();
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token || !user) {
      // ensure disconnect if logged out
      if (userSocket.connected) userSocket.disconnect();
      return;
    }

    // Connect if not connected
    if (!userSocket.connected) {
      userSocket.connect();
    }

    const handleConnect = () => {
      // join user-specific room
      userSocket.emit('user:join', user.id);
    };

    const handleNewNotification = (payload: { unreadCount: number }) => {
      if (typeof payload?.unreadCount === 'number') {
        dispatch(setUnreadCount(payload.unreadCount));
      }
    };

    userSocket.on('connect', handleConnect);
    userSocket.on('new_notification', handleNewNotification);

    return () => {
      userSocket.off('connect', handleConnect);
      userSocket.off('new_notification', handleNewNotification);
    };
  }, [dispatch, token, user, userSocket]);

  return null;
}
