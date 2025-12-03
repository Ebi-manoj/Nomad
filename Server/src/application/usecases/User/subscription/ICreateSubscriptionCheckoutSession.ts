import { IPaymentService } from '../../../services/IPaymentService';
import { IUserRepository } from '../../../repositories/IUserRepository';

export interface CreateSubscriptionCheckoutSessionDTO {
  userId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  trialPeriodDays?: number;
  metadata?: Record<string, string>;
}

export interface ICreateSubscriptionCheckoutSessionUseCase {
  execute(
    data: CreateSubscriptionCheckoutSessionDTO
  ): Promise<{ id: string; url: string }>;
}
