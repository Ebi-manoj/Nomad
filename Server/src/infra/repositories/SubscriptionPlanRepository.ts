import { MongoBaseRepository } from './BaseRepository';
import { ISubscriptionPlanRepository } from '../../application/repositories/ISubscriptionPlanRepository';
import { SubscriptionPlan } from '../../domain/entities/SubscriptionPlan';
import {
  ISubscriptionPlanDocument,
  SubscriptionPlanModel,
} from '../database/SubscriptionPlan.model';
import { subscriptionPlanMapper } from '../mappers/subscriptionPlanDomainMapper';

export class SubscriptionPlanRepository
  extends MongoBaseRepository<SubscriptionPlan, ISubscriptionPlanDocument>
  implements ISubscriptionPlanRepository
{
  constructor() {
    super(SubscriptionPlanModel, subscriptionPlanMapper);
  }

  async findByTier(tier: string): Promise<SubscriptionPlan | null> {
    const doc = await SubscriptionPlanModel.findOne({
      tier: tier.toUpperCase(),
    });
    return doc ? subscriptionPlanMapper.toDomain(doc) : null;
  }

  async findAllActive(): Promise<SubscriptionPlan[]> {
    const docs = await SubscriptionPlanModel.find({ isActive: true }).sort({
      'price.monthly': 1,
    });
    return docs.map(d => subscriptionPlanMapper.toDomain(d));
  }

  async findByStripeId(stripeId: string): Promise<SubscriptionPlan | null> {
    const doc = await SubscriptionPlanModel.findOne({
      $or: [{ 'stripeId.monthly': stripeId }, { 'stripeId.yearly': stripeId }],
    });
    return doc ? subscriptionPlanMapper.toDomain(doc) : null;
  }
  async findDefaultPlan(): Promise<SubscriptionPlan | null> {
    const doc = await this.model.findOne({ isDefault: true });
    return doc ? this.mapper.toDomain(doc) : null;
  }
}
