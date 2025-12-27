import { SubscriptionServiceResDTO } from '../../domain/dto/SubscriptionDTO';
import { Subscription } from '../../domain/entities/Subscription';
import {
  BillingCycle,
  SubscriptionStatus,
} from '../../domain/enums/subscription';
import { SubscriptionPlanNotFound } from '../../domain/errors/SubscriptionError';
import { ISubscriptionPlanRepository } from '../repositories/ISubscriptionPlanRepository';
import { ISubscriptionRepository } from '../repositories/ISubscriptionRepository';
import { ISubscriptionService } from './ISubscriptionService';

export class SubscriptionService implements ISubscriptionService {
  constructor(
    private readonly _subscriptionRepository: ISubscriptionRepository,
    private readonly _subscriptionPlans: ISubscriptionPlanRepository
  ) {}
  async getActiveSubscription(
    userId: string
  ): Promise<SubscriptionServiceResDTO> {
    let subscription = await this._subscriptionRepository.findActiveByUserId(
      userId
    );
    if (subscription) {
      return {
        tier: subscription.getTier(),
        features: subscription.getFeatures(),
        subscription,
      };
    }
    const freePlan = await this._subscriptionPlans.findDefaultPlan();
    if (!freePlan) throw new SubscriptionPlanNotFound();
    subscription = new Subscription({
      userId,
      planId: freePlan.getId() as string,
      billingCycle: BillingCycle.NONE,
      badgeColor: freePlan.getBadgeColor(),
      status: SubscriptionStatus.ACTIVE,
      tier: freePlan.getTier(),
      features: freePlan.getFeatures(),
      price: 0,
    });

    return {
      tier: freePlan.getTier(),
      features: freePlan.getFeatures(),
      subscription,
    };
  }
}
