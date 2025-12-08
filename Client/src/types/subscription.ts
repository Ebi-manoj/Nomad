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

export interface SubscriptionFeatures {
  maxJoinRequestsPerRide: number | null;
  maxRideAcceptancesPerMonth: number | null;
  platformFeePercentage: number;
  verificationBadge: boolean;
  priorityInList: boolean;
  customCostSharing: boolean;
}

export interface SubscriptionDTO {
  id: string;
  userId: string;
  billingCycle: BillingCycle;
  tier: SubscriptionTierType;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  price: number;
  currency: string;
  cancelledAt?: string | null;
  createdAt: string;
  features: SubscriptionFeatures;
}

export interface VerifySubscriptionResponse {
  status: 'processing' | 'completed';
  subscription: SubscriptionDTO | null;
}

export interface SubscriptionUsageDTO {
  id?: string;
  userId: string;
  month: string;
  joinRequestsCount: number;
  rideAcceptancesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetSubscriptionDetailsResDTO {
  tier: SubscriptionTierType;
  features: SubscriptionFeatures;
  subscription?: SubscriptionDTO | null;
  subscriptionUsage: SubscriptionUsageDTO;
}
