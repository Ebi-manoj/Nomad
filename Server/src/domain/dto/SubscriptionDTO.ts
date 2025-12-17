import { Subscription, SubscriptionFeatures } from '../entities/Subscription';
import { BillingCycle } from '../enums/subscription';

export interface SubscriptionFeaturesResDTO {
  maxJoinRequestsPerRide: number | null;
  maxRideAcceptancesPerMonth: number | null;
  platformFeePercentage: number;
  verificationBadge: boolean;
  priorityInList: boolean;
  customCostSharing: boolean;
}

export interface SubscriptionUsageDTO {
  id: string;
  userId: string;
  month: string;
  joinRequestsCount: number;
  rideAcceptancesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionResDTO {
  id: string;
  userId: string;
  billingCycle: BillingCycle;
  tier: string;
  badgeColor: string;
  stripeSubscriptionId: string | undefined;
  stripeCustomerId: string | undefined;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  price: number;
  currency: string;
  cancelledAt: undefined | Date;
  createdAt: Date;
  features: SubscriptionFeaturesResDTO;
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

export interface GetSubscriptionDetailsResDTO {
  tier: string;
  features: SubscriptionFeaturesResDTO;
  subscription?: SubscriptionResDTO;
  subscriptionUsage: SubscriptionUsageDTO;
}

export interface SubscriptionServiceResDTO {
  tier: string;
  features: SubscriptionFeatures;
  subscription: Subscription;
}

export interface CreateSubscriptionReqDTO {
  userId: string;
  planId: string;
  tier: string;
  billingCycle: BillingCycle;
  startDate: Date;
  price: number;
  currency: string;
  stripeSubscriptionId: string;
  stripeCustomerId?: string;
  stripePriceId: string;
  stripeSessionId: string;
}
