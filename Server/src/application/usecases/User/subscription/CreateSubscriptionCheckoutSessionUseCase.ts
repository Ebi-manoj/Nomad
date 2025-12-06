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
  FreeTierNotRequiredPayment,
  InvalidPlanTierOrBilling,
} from '../../../../domain/errors/SubscriptionError';
import { ICheckoutSessionRepository } from '../../../repositories/ICheckoutSessionRepository';
import { CHECKOUT_SESSION_TTL } from '../../../../domain/enums/Constants';

export class CreateSubscriptionCheckoutSessionUseCase
  implements ICreateSubscriptionCheckoutSessionUseCase
{
  constructor(
    private readonly users: IUserRepository,
    private readonly payments: IPaymentService,
    private priceConfig: PriceIdMapping,
    private readonly checkoutSessions: ICheckoutSessionRepository
  ) {}

  async execute(
    data: CreateSubscriptionCheckoutSessionDTO
  ): Promise<{ id: string; url: string }> {
    const user = await this.users.findById(data.userId);
    if (!user) throw new UserNotFound();

    if (data.tier === SubscriptionTier.FREE) {
      throw new FreeTierNotRequiredPayment();
    }

    const idempotencyKey = this.generateIdempotencyKey(
      data.userId,
      data.tier,
      data.billingCycle
    );

    const findExistingSession = await this.checkoutSessions.getByIdempotencyKey(
      idempotencyKey
    );
    if (findExistingSession && findExistingSession.status == 'pending') {
      console.log('From the session');
      return {
        id: findExistingSession.stripeSessionId,
        url: findExistingSession.url,
      };
    }

    const priceId = this.priceConfig[data.tier]?.[data.billingCycle];
    if (!priceId) throw new InvalidPlanTierOrBilling();

    const session = await this.payments.createSubscriptionCheckoutSession({
      priceId,
      customerEmail: user.getEmail(),
      metadata: { ...data, ...data.metadata },
      trialPeriodDays: data.trialPeriodDays,
    });

    // Persist checkout session

    const expiresAt = new Date(
      Date.now() + CHECKOUT_SESSION_TTL * 1000
    ).toISOString();
    await this.checkoutSessions.create(
      {
        userId: data.userId,
        stripeSessionId: session.id,
        status: 'pending',
        priceId,
        url: session.url,
        idempotencyKey,
        expiresAt,
        metadata: { tier: data.tier, billingCycle: data.billingCycle },
        createdAt: new Date().toISOString(),
      },
      CHECKOUT_SESSION_TTL
    );

    return session;
  }

  private generateIdempotencyKey(
    userId: string,
    tier: SubscriptionTier,
    billingCycle: BillingCycle
  ): string {
    return `${userId}${tier}${billingCycle}`;
  }
}
