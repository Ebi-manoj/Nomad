import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { markAllAsRead } from '@/store/features/user/notifications/notificationsSlice';
import { fetchNotifications } from '@/store/features/user/notifications/notifications.thunk';
import { useState } from 'react';

export function NotificationBell() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const unreadCount = useSelector(
    (s: RootState) => s.notifications.unreadCount
  );
  const items = useSelector((s: RootState) => s.notifications.items);

  const handleMarkAllRead = () => {
    dispatch(markAllAsRead());
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      dispatch(fetchNotifications());
    }
  };

  const formatDate = (d?: string | Date) => {
    if (!d) return '';
    const date = typeof d === 'string' ? new Date(d) : d;
    return date.toLocaleString();
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button className="relative p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 rounded-xl shadow-lg border-0">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={handleMarkAllRead}
            >
              Mark all as read
            </button>
          </div>
        </div>
        <div className="max-h-80 overflow-auto">
          {items.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No notifications yet.</div>
          ) : (
            <ul className="divide-y">
              {items.map(n => (
                <li
                  key={n.id ?? `${n.title}-${n.createdAt}`}
                  className={`p-3 flex gap-3 ${!n.read ? 'bg-gray-50' : ''}`}
                >
                  <span
                    className={`mt-2 h-2 w-2 rounded-full ${n.read ? 'bg-gray-300' : 'bg-blue-500'}`}
                    aria-hidden
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{n.title}</div>
                    <div className="text-xs text-gray-600">{n.message}</div>
                    <div className="text-[10px] text-gray-400 mt-1">
                      {formatDate(n.createdAt)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
