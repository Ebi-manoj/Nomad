import {
  CheckoutSessionRecord,
  CheckoutSessionStatus,
} from '../../domain/entities/CheckoutSession';

export interface ICheckoutSessionRepository {
  create(record: CheckoutSessionRecord, ttlSeconds: number): Promise<void>;
  getByStripeSessionId(
    stripeSessionId: string
  ): Promise<CheckoutSessionRecord | null>;
  getByIdempotencyKey(
    idempotencyKey: string
  ): Promise<CheckoutSessionRecord | null>;
  updateStatus(
    stripeSessionId: string,
    status: CheckoutSessionStatus
  ): Promise<void>;
}
