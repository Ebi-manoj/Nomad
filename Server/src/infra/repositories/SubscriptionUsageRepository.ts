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
    const doc = await SubscriptionUsageModel.findOne({ userId, month });
    return doc ? subscriptionUsageMapper.toDomain(doc) : null;
  }

  async findBySubscriptionAndMonth(
    subscriptionId: string,
    month: string
  ): Promise<SubscriptionUsage | null> {
    const doc = await SubscriptionUsageModel.findOne({ subscriptionId, month });
    return doc ? subscriptionUsageMapper.toDomain(doc) : null;
  }
}
