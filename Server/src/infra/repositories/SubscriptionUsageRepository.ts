import { MongoBaseRepository } from './BaseRepository';
import { ISubscriptionUsageRepository } from '../../application/repositories/ISubscriptionUsageRepository';
import { SubscriptionUsage } from '../../domain/entities/SubscriptionUsage';
import {
  ISubscriptionUsageDocument,
  SubscriptionUsageModel,
} from '../database/SubscriptionUsage.model';
import { subscriptionUsageMapper } from '../mappers/subscriptionUsageMapper';

export class SubscriptionUsageRepository
  extends MongoBaseRepository<SubscriptionUsage, ISubscriptionUsageDocument>
  implements ISubscriptionUsageRepository
{
  constructor() {
    super(SubscriptionUsageModel, subscriptionUsageMapper);
  }

  async findByUserAndMonth(
    userId: string,
    month: string
  ): Promise<SubscriptionUsage | null> {
    const doc = await this.model.findOne({ userId, month });
    return doc ? this.mapper.toDomain(doc) : null;
  }
  async findByUserId(userId: string): Promise<SubscriptionUsage | null> {
    const doc = await this.model.findOne({ userId });
    return doc ? this.mapper.toDomain(doc) : null;
  }
}
