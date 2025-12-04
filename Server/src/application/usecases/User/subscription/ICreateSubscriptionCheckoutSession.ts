import { BillingCycle, SubscriptionTier } from '../../../../domain/enums/subscription';

export interface CreateSubscriptionCheckoutSessionDTO {
  userId: string;
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  trialPeriodDays?: number;
  metadata?: Record<string, string>;
}

export interface ICreateSubscriptionCheckoutSessionUseCase {
  execute(
    data: CreateSubscriptionCheckoutSessionDTO
  ): Promise<{ id: string; url: string }>;
}
