import { IUserRepository } from '../../../repositories/IUserRepository';
import { IPaymentService } from '../../../services/IPaymentService';
import {
  CreateSubscriptionCheckoutSessionDTO,
  ICreateSubscriptionCheckoutSessionUseCase,
} from './ICreateSubscriptionCheckoutSession';
import { UserNotFound } from '../../../../domain/errors/CustomError';
import {
  PriceIdMapping,
  SubscriptionTier,
} from '../../../../domain/enums/subscription';
import {
  FreeTierNotRequiredPayment,
  InvalidPlanTierOrBilling,
} from '../../../../domain/errors/SubscriptionError';

export class CreateSubscriptionCheckoutSessionUseCase
  implements ICreateSubscriptionCheckoutSessionUseCase
{
  constructor(
    private readonly users: IUserRepository,
    private readonly payments: IPaymentService,
    private priceConfig: PriceIdMapping
  ) {}

  async execute(
    data: CreateSubscriptionCheckoutSessionDTO
  ): Promise<{ id: string; url: string }> {
    const user = await this.users.findById(data.userId);
    if (!user) throw new UserNotFound();

    if (data.tier === SubscriptionTier.FREE) {
      throw new FreeTierNotRequiredPayment();
    }

    const priceId = this.priceConfig[data.tier]?.[data.billingCycle];
    if (!priceId) throw new InvalidPlanTierOrBilling();

    const session = await this.payments.createSubscriptionCheckoutSession({
      priceId,
      customerEmail: user.getEmail(),
      metadata: data.metadata,
      trialPeriodDays: data.trialPeriodDays,
    });

    return session;
  }
}
