import { SubscriptionServiceResDTO } from '../../domain/dto/SubscriptionDTO';
import { Subscription } from '../../domain/entities/Subscription';
import {
  BillingCycle,
  SubscriptionStatus,
  SubscriptionTier,
} from '../../domain/enums/subscription';
import { ISubscriptionRepository } from '../repositories/ISubscriptionRepository';
import { ISubscriptionService } from './ISubscriptionService';

export class SubscriptionService implements ISubscriptionService {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository
  ) {}
  async getActiveSubscription(
    userId: string
  ): Promise<SubscriptionServiceResDTO> {
    let subscription = await this.subscriptionRepository.findActiveByUserId(
      userId
    );
    if (!subscription) {
      subscription = new Subscription({
        userId,
        tier: SubscriptionTier.FREE,
        billingCycle: BillingCycle.YEARLY,
        status: SubscriptionStatus.ACTIVE,
        price: 0,
      });
    }
    const tier = subscription.getTier();

    return {
      tier,
      features: subscription.getFeatures(),
      subscription: tier !== SubscriptionTier.FREE ? subscription : null,
    };
  }
}
