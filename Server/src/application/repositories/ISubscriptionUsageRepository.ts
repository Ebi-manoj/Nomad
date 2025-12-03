import { SubscriptionUsage } from '../../domain/entities/SubscriptionUsage';
import { IBaseRepository } from './IBaseRepository';

export interface ISubscriptionUsageRepository
  extends IBaseRepository<SubscriptionUsage> {
  findByUserAndMonth(
    userId: string,
    month: string
  ): Promise<SubscriptionUsage | null>;
  findBySubscriptionAndMonth(
    subscriptionId: string,
    month: string
  ): Promise<SubscriptionUsage | null>;
}
