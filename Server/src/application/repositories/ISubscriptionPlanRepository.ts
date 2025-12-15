import { SubscriptionPlan } from '../../domain/entities/SubscriptionPlan';
import { IBaseRepository } from './IBaseRepository';

export interface ISubscriptionPlanRepository extends IBaseRepository<SubscriptionPlan> {
  findByTier(tier: string): Promise<SubscriptionPlan | null>;
  findAllActive(): Promise<SubscriptionPlan[]>;
  findByStripeId(stripeId: string): Promise<SubscriptionPlan | null>;
}
