import { SubscriptionUsage } from '../../domain/entities/SubscriptionUsage';

export interface ISubscriptionUsageService {
  getUsage(userId: string): Promise<SubscriptionUsage>;
  incrementRideAccepetance(riderId: string): Promise<void>;
  incrementJoinRequest(hikerId: string): Promise<void>;
}
