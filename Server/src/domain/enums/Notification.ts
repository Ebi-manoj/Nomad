export const NOTIFICATION_TYPES = [
  'join_request',
  'ride_confirmed',
  'booking_cancelled',
  'new_message',
  'ride_started',
  'ride_completed',
  'payment_received',
  'deviation_alert',
  'sos_alert',
] as const;

export type NotificationType = typeof NOTIFICATION_TYPES[number];
