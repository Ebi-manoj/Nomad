export const SubscriptionTier = {
  FREE: 'FREE',
  HIKER_PRO: 'HIKER_PRO',
  RIDER_PRO: 'RIDER_PRO',
  PREMIUM_PLUS: 'PREMIUM_PLUS',
} as const;

export type SubscriptionTierType =
  (typeof SubscriptionTier)[keyof typeof SubscriptionTier];

export type BillingCycle = 'MONTHLY' | 'YEARLY';

export interface CreateSubscriptionCheckoutSessionDTO {
  tier: SubscriptionTierType;
  billingCycle: BillingCycle;
  trialPeriodDays?: number;
  metadata?: Record<string, string>;
}
