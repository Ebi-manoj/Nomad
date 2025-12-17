import { CreateSubscriptionReqDTO } from '../../../../domain/dto/SubscriptionDTO';
import { Subscription } from '../../../../domain/entities/Subscription';
import { SubscriptionStatus } from '../../../../domain/enums/subscription';
import { SubscriptionPlanNotFound } from '../../../../domain/errors/SubscriptionError';
import { ICheckoutSessionRepository } from '../../../repositories/ICheckoutSessionRepository';
import { ISubscriptionPlanRepository } from '../../../repositories/ISubscriptionPlanRepository';
import { ISubscriptionRepository } from '../../../repositories/ISubscriptionRepository';
import { ICreateSubscriptionUseCase } from './ICreateSubscription';

export class CreateSubscriptionUseCase implements ICreateSubscriptionUseCase {
  constructor(
    private readonly _subscriptionPlan: ISubscriptionPlanRepository,
    private readonly _subscriptionRepository: ISubscriptionRepository,
    private readonly _checkoutSession: ICheckoutSessionRepository
  ) {}
  async execute(data: CreateSubscriptionReqDTO): Promise<void> {
    const subscriptionPlan = await this._subscriptionPlan.findById(data.planId);
    if (!subscriptionPlan) throw new SubscriptionPlanNotFound();

    const subscription = new Subscription({
      userId: data.userId,
      planId: data.planId,
      tier: data.tier,
      badgeColor: subscriptionPlan.getBadgeColor(),
      billingCycle: data.billingCycle,
      status: SubscriptionStatus.ACTIVE,
      startDate: data.startDate,
      autoRenew: true,
      price: data.price,
      stripeCustomerId: data.stripeCustomerId,
      stripeSubscriptionId: data.stripeSubscriptionId,
      stripePriceId: data.stripePriceId,
      features: subscriptionPlan.getFeatures(),
    });

    await this._subscriptionRepository.create(subscription);
    await this._checkoutSession.updateStatus(data.stripeSessionId, 'completed');
  }
}
