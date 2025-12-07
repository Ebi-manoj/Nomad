import { SubscriptionUsage } from '../../domain/entities/SubscriptionUsage';

export interface ISubscriptionUsageService {
  getUsage(userId: string): Promise<SubscriptionUsage>;
}
