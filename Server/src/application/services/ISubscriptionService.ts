import { SubscriptionServiceResDTO } from '../../domain/dto/SubscriptionDTO';

export interface ISubscriptionService {
  getActiveSubscription(userId: string): Promise<SubscriptionServiceResDTO>;
}
