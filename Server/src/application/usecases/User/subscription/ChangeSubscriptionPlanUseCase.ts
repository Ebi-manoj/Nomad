import { IUserRepository } from '../../../repositories/IUserRepository';
import { IPaymentService } from '../../../services/IPaymentService';
import { ISubscriptionRepository } from '../../../repositories/ISubscriptionRepository';
import { ISubscriptionPlanRepository } from '../../../repositories/ISubscriptionPlanRepository';
import {
  ChangeSubscriptionPlanDTO,
  IChangeSubscriptionPlanUseCase,
} from './IChangeSubscriptionPlanUseCase';
import { UserNotFound } from '../../../../domain/errors/CustomError';
import {
  InvalidPlanTierOrBilling,
  NoActiveSubscription,
  SubscriptionPlanNotFound,
} from '../../../../domain/errors/SubscriptionError';
import { BillingCycle } from '../../../../domain/enums/subscription';
import { SubscriptionPlan } from '../../../../domain/entities/SubscriptionPlan';

export class ChangeSubscriptionPlanUseCase
  implements IChangeSubscriptionPlanUseCase
{
  constructor(
    private readonly _users: IUserRepository,
    private readonly _payments: IPaymentService,
    private readonly _subscriptionRepository: ISubscriptionRepository,
    private readonly _subscriptionPlans: ISubscriptionPlanRepository
  ) {}

  async execute(
    data: ChangeSubscriptionPlanDTO
  ): Promise<{ success: boolean; effectiveDate: Date }> {
    const user = await this._users.findById(data.userId);
    if (!user) throw new UserNotFound();

    const newPlan = await this._subscriptionPlans.findById(data.newPlanId);
    if (!newPlan) throw new SubscriptionPlanNotFound();

    const currentSubscription =
      await this._subscriptionRepository.findActiveByUserId(data.userId);
    if (
      !currentSubscription ||
      !currentSubscription.getStripeSubscriptionId()
    ) {
      throw new NoActiveSubscription();
    }

    const currentPlanId = currentSubscription.getPlanId();
    const currentPlan = await this._subscriptionPlans.findById(currentPlanId);
    if (!currentPlan) throw new SubscriptionPlanNotFound();

    const isUpgrade = this._isUpgrade(currentPlan, newPlan, data.billingCycle);

    const stripeIds = newPlan.getStripeId();
    const newPriceId =
      data.billingCycle === BillingCycle.MONTHLY
        ? stripeIds.monthly
        : stripeIds.yearly;
    if (!newPriceId) throw new InvalidPlanTierOrBilling();

    const stripeSubscriptionId =
      currentSubscription.getStripeSubscriptionId() as string;

    if (isUpgrade) {
      const sub = await this._payments.getSubscription(stripeSubscriptionId);
      const subscriptionItemId = sub.items[0]?.id;
      if (!subscriptionItemId) throw new Error('No subscription item found');

      await this._payments.updateSubscription(stripeSubscriptionId, {
        items: [{ id: subscriptionItemId, price: newPriceId }],
        proration_behavior: 'always_invoice',
        billing_cycle_anchor: 'unchanged',
      });

      return { success: true, effectiveDate: new Date() };
    } else {
      const schedule = await this._payments.createSubscriptionSchedule({
        from_subscription: stripeSubscriptionId,
      });

      const currentPhase = schedule.phases[0];

      await this._payments.updateSubscriptionSchedule(schedule.id, {
        phases: [
          currentPhase,
          {
            items: [{ price: newPriceId, quantity: 1 }],
            proration_behavior: 'none',
            iterations: 1,
          },
        ],
      });

      const effectiveDate = currentSubscription.getEndDate();
      return { success: true, effectiveDate };
    }
  }

  private _isUpgrade(
    currentPlan: SubscriptionPlan,
    newPlan: SubscriptionPlan,
    billing: BillingCycle
  ): boolean {
    const getPrice = (plan: SubscriptionPlan) =>
      billing === BillingCycle.MONTHLY
        ? plan.getPrice().monthly
        : plan.getPrice().yearly;
    return getPrice(newPlan) > getPrice(currentPlan);
  }
}
