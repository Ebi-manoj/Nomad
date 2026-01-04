import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Bell, CheckCheck, Loader2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDistanceToNow } from 'date-fns';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { RootState } from '@/store/store';
import {
  fetchNotifications,
  markAllNotificationsRead,
} from '@/store/features/user/notifications/notifications.thunk';

export function NotificationBell() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const { items, unreadCount, loading } = useSelector(
    (state: RootState) => state.notifications
  );

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsRead());
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
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-700 cursor-pointer" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-[11px] font-semibold flex items-center justify-center shadow-sm">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="
          w-[380px]
          max-w-[95vw]
          h-[80vh]
          p-0
          rounded-2xl
          border
          border-gray-200
          shadow-xl
          flex
          flex-col
        "
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {unreadCount} unread
                </p>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCheck className="w-4 h-4" />
                )}
                Mark all read
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Notifications */}
        <div className="flex-1 overflow-y-auto">
          {loading && items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-7 h-7 text-gray-400 animate-spin" />
              <p className="text-sm text-gray-500 mt-3">
                Loading notifications...
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Bell className="w-7 h-7 text-gray-400 " />
              </div>
              <h4 className="text-base font-medium text-gray-900 mb-1">
                No notifications yet
              </h4>
              <p className="text-sm text-gray-500">
                We'll notify you when something arrives
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {items.map(notification => (
                <div
                  key={
                    notification.id ??
                    `${notification.title}-${notification.createdAt}`
                  }
                  className={`px-4 py-3 transition-colors cursor-pointer hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50/50' : 'bg-white'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Bell className="w-4.5 h-4.5 text-blue-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 mt-1" />
                        )}
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {notification.message}
                      </p>

                      <time className="text-xs text-gray-500 font-medium">
                        {formatDate(notification.createdAt)}
                      </time>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <button className="w-full text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              All notifications
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
