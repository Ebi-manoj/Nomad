import { SubscriptionFeatures } from '../entities/Subscription';
import { BillingCycle, SubscriptionTier } from '../enums/subscription';

export interface SubscriptionResDTO {
  id: string;
  userId: string;
  billingCycle: BillingCycle;
  tier: SubscriptionTier;
  stripeSubscriptionId: string | undefined;
  stripeCustomerId: string | undefined;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  price: number;
  currency: string;
  cancelledAt: undefined | Date;
  createdAt: Date;
  features: SubscriptionFeatures;
}

export interface HandleWebHookReqDTO {
  signature: string;
  body: Buffer;
}

export interface VerifySubscripitonReqDTO {
  userId: string;
  sessionId: string;
}

export interface VerifySubscriptionResDTO {
  status: 'processing' | 'completed';
  subscription: null | SubscriptionResDTO;
}
