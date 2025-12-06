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

export interface ICheckoutSessionRepository {
  create(record: CheckoutSessionRecord, ttlSeconds: number): Promise<void>;
  getByStripeSessionId(
    stripeSessionId: string
  ): Promise<CheckoutSessionRecord | null>;
  getByIdempotencyKey(
    idempotencyKey: string
  ): Promise<CheckoutSessionRecord | null>;
}
