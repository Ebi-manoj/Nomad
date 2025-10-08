import { IOTPRepository } from '../../application/repositories/IOTPRepository';
import { redisClient } from '../database/connectRedis';

export class RedisOTPRepository implements IOTPRepository {
  async saveOTP(email: string, otp: string, ttl: number): Promise<void> {
    await redisClient.set(email, otp, { EX: ttl });
  }
  async getOTP(email: string): Promise<string | null> {
    return await redisClient.get(email);
  }
}
