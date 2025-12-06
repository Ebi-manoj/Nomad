import { redisClient } from '../database/connectRedis';
import { ICheckoutSessionRepository } from '../../application/repositories/ICheckoutSessionRepository';
import { CheckoutSessionRecord } from '../../domain/entities/CheckoutSession';

export class RedisCheckoutSessionRepository
  implements ICheckoutSessionRepository
{
  private sessionKey(id: string) {
    return `checkout:session:${id}`;
  }
  private idempKey(key: string) {
    return `checkout:session:idemp:${key}`;
  }

  async create(
    record: CheckoutSessionRecord,
    ttlSeconds: number
  ): Promise<void> {
    const sessionKey = this.sessionKey(record.stripeSessionId);
    const idempKey = this.idempKey(record.idempotencyKey);

    const payload = JSON.stringify(record);

    // Store the session payload with TTL
    await redisClient.set(sessionKey, payload, { EX: ttlSeconds });
    // Index by idempotency key for quick lookup
    await redisClient.set(idempKey, record.stripeSessionId, { EX: ttlSeconds });
  }

  async getByStripeSessionId(
    stripeSessionId: string
  ): Promise<CheckoutSessionRecord | null> {
    const data = await redisClient.get(this.sessionKey(stripeSessionId));
    return data ? (JSON.parse(data) as CheckoutSessionRecord) : null;
  }

  async getByIdempotencyKey(
    idempotencyKey: string
  ): Promise<CheckoutSessionRecord | null> {
    const sessionId = await redisClient.get(this.idempKey(idempotencyKey));
    if (!sessionId) return null;
    return this.getByStripeSessionId(sessionId);
  }

  async updateStatus(
    stripeSessionId: string,
    status: CheckoutSessionRecord['status']
  ): Promise<void> {
    const key = this.sessionKey(stripeSessionId);
    const data = await redisClient.get(key);
    if (!data) return;
    const ttl = await redisClient.ttl(key);
    const record = JSON.parse(data) as CheckoutSessionRecord;
    record.status = status;
    const payload = JSON.stringify(record);
    if (ttl && ttl > 0) {
      await redisClient.set(key, payload, { EX: ttl });
    } else {
      await redisClient.set(key, payload);
    }
  }
}
