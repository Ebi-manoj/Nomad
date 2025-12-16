import { IUserRepository } from '../../../repositories/IUserRepository';
import { IPaymentService } from '../../../services/IPaymentService';
import {
  CreateSubscriptionCheckoutSessionDTO,
  ICreateSubscriptionCheckoutSessionUseCase,
} from './ICreateSubscriptionCheckoutSession';
import { UserNotFound } from '../../../../domain/errors/CustomError';
import {
  BillingCycle,
  PriceIdMapping,
  SubscriptionTier,
} from '../../../../domain/enums/subscription';
import {
  AlreadySubscribed,
  FreeTierNotRequiredPayment,
  InvalidPlanTierOrBilling,
  SubscriptionPlanNotFound,
} from '../../../../domain/errors/SubscriptionError';
import { ICheckoutSessionRepository } from '../../../repositories/ICheckoutSessionRepository';
import { CHECKOUT_SESSION_TTL } from '../../../../domain/enums/Constants';
import { ISubscriptionRepository } from '../../../repositories/ISubscriptionRepository';
import { ISubscriptionPlanRepository } from '../../../repositories/ISubscriptionPlanRepository';

export class CreateSubscriptionCheckoutSessionUseCase
  implements ICreateSubscriptionCheckoutSessionUseCase
{
  constructor(
    private readonly _users: IUserRepository,
    private readonly _payments: IPaymentService,
    private _priceConfig: PriceIdMapping,
    private readonly _checkoutSessions: ICheckoutSessionRepository,
    private readonly _subscriptionRepository: ISubscriptionRepository,
    private readonly _subscriptionPlans: ISubscriptionPlanRepository
  ) {}

  async execute(
    data: CreateSubscriptionCheckoutSessionDTO
  ): Promise<{ id: string; url: string }> {
    const plan = await this._subscriptionPlans.findById(data.planId);
    if (!plan) throw new SubscriptionPlanNotFound();

    const user = await this._users.findById(data.userId);
    if (!user) throw new UserNotFound();

    if (plan.getTier() === SubscriptionTier.FREE) {
      throw new FreeTierNotRequiredPayment();
    }

    const isSubscribed = await this._subscriptionRepository.findActiveByUserId(
      data.userId
    );
    if (isSubscribed) throw new AlreadySubscribed();

    const idempotencyKey = this._generateIdempotencyKey(
      data.userId,
      data.tier,
      data.billingCycle
    );

    const findExistingSession =
      await this._checkoutSessions.getByIdempotencyKey(idempotencyKey);
    if (findExistingSession && findExistingSession.status == 'pending') {
      const now = Date.now();
      const expiryTime = new Date(findExistingSession.createdAt).getTime();

      const isNotExpired = now - expiryTime;

      if (isNotExpired < 2 * 1000 * 60) {
        return {
          id: findExistingSession.stripeSessionId,
          url: findExistingSession.url,
        };
      }
    }
    const stripeId = plan.getStripeId();
    const priceId =
      data.billingCycle == 'MONTHLY' ? stripeId.monthly : stripeId.yearly;
    if (!priceId) throw new InvalidPlanTierOrBilling();

    const session = await this._payments.createSubscriptionCheckoutSession({
      priceId,
      customerEmail: user.getEmail(),
      metadata: { ...data, ...data.metadata },
      trialPeriodDays: data.trialPeriodDays,
    });

    // Persist checkout session

    const expiresAt = new Date(
      Date.now() + CHECKOUT_SESSION_TTL * 1000
    ).toISOString();
    await this._checkoutSessions.create(
      {
        userId: data.userId,
        stripeSessionId: session.id,
        status: 'pending',
        priceId,
        url: session.url,
        idempotencyKey,
        expiresAt,
        metadata: {
          planId: plan.getId(),
          tier: data.tier,
          billingCycle: data.billingCycle,
        },
        createdAt: new Date().toISOString(),
      },
      CHECKOUT_SESSION_TTL
    );

    return session;
  }

  private _generateIdempotencyKey(
    userId: string,
    tier: SubscriptionTier,
    billingCycle: BillingCycle
  ): string {
    return `${userId}${tier}${billingCycle}`;
  }
}
