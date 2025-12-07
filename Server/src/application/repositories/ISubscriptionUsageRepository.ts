import { SubscriptionUsage } from '../../domain/entities/SubscriptionUsage';
import { IBaseRepository } from './IBaseRepository';

export interface ISubscriptionUsageRepository
  extends IBaseRepository<SubscriptionUsage> {
  findByUserAndMonth(
    userId: string,
    month: string
  ): Promise<SubscriptionUsage | null>;

  findByUserId(userId: string): Promise<SubscriptionUsage | null>;
}
