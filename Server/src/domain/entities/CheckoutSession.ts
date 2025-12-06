export type CheckoutSessionStatus =
  | 'pending'
  | 'completed'
  | 'expired'
  | 'cancelled';

export interface CheckoutSessionRecord {
  userId: string;
  stripeSessionId: string;
  status: CheckoutSessionStatus;
  priceId: string;
  url: string;
  idempotencyKey: string;
  expiresAt: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}
