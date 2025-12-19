export type BillingCycle = 'MONTHLY' | 'YEARLY' | 'NONE';

export type Pricing = {
  monthly: number;
  yearly: number;
};

export interface SubscriptionPlanDTO {
  id: string;
  tier: string;
  description: string;
  features: {
    maxJoinRequestsPerRide: number | null;
    maxRideAcceptancesPerMonth: number | null;
    platformFeePercentage: number;
    verificationBadge: boolean;
    priorityInList: boolean;
    customCostSharing: boolean;
  };
  price: Pricing;
  displayOrder: number;
  isActive: boolean;
  isDefault: boolean;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubscriptionCheckoutSessionDTO {
  planId: string;
  tier: string;
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
  tier: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  startDate: string;
  badgeColor: string;
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
  tier: string;
  features: SubscriptionFeatures;
  subscription?: SubscriptionDTO | null;
  subscriptionUsage: SubscriptionUsageDTO;
}
