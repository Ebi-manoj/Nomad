import { MongoBaseRepository } from './BaseRepository';
import { ISubscriptionRepository } from '../../application/repositories/ISubscriptionRepository';
import { Subscription } from '../../domain/entities/Subscription';
import {
  ISubscriptionDocument,
  SubscriptionModel,
} from '../database/Subscription.model';
import { subscriptionMapper } from '../mappers/subscriptionDomainMapper';
import { SubscriptionStatus } from '../../domain/enums/subscription';

export class SubscriptionRepository
  extends MongoBaseRepository<Subscription, ISubscriptionDocument>
  implements ISubscriptionRepository
{
  constructor() {
    super(SubscriptionModel, subscriptionMapper);
  }

  async findActiveByUserId(userId: string): Promise<Subscription | null> {
    const now = new Date();
    const doc = await SubscriptionModel.findOne({
      userId,
      status: SubscriptionStatus.ACTIVE,
      endDate: { $gt: now },
    }).sort({ endDate: -1 });
    return doc ? subscriptionMapper.toDomain(doc) : null;
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    const docs = await SubscriptionModel.find({ userId }).sort({
      createdAt: -1,
    });
    return docs.map(doc => subscriptionMapper.toDomain(doc));
  }
}
