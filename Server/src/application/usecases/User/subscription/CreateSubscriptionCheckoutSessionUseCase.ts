import { IUserRepository } from '../../../repositories/IUserRepository';
import { IPaymentService } from '../../../services/IPaymentService';
import {
  CreateSubscriptionCheckoutSessionDTO,
  ICreateSubscriptionCheckoutSessionUseCase,
} from './ICreateSubscriptionCheckoutSession';
import { UserNotFound } from '../../../../domain/errors/CustomError';

export class CreateSubscriptionCheckoutSessionUseCase
  implements ICreateSubscriptionCheckoutSessionUseCase
{
  constructor(
    private readonly users: IUserRepository,
    private readonly payments: IPaymentService
  ) {}

  async execute(
    data: CreateSubscriptionCheckoutSessionDTO
  ): Promise<{ id: string; url: string }> {
    const user = await this.users.findById(data.userId);
    if (!user) throw new UserNotFound();

    const session = await this.payments.createSubscriptionCheckoutSession({
      priceId: data.priceId,
      successUrl: data.successUrl,
      cancelUrl: data.cancelUrl,
      customerEmail: user.getEmail(),
      metadata: data.metadata,
      trialPeriodDays: data.trialPeriodDays,
    });

    return session;
  }
}
