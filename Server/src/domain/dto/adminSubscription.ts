import { Pricing } from '../entities/SubscriptionPlan';

export interface CreateStripeProductDTO {
  name: string;
  description?: string;
  metadata?: Record<string, string>;
  images?: string[];
}

export interface StripeProductResponse {
  id: string;
  name: string;
  description?: string;
  images: string[];
  metadata: Record<string, string>;
}

export interface CreateStripePriceDTO {
  productId: string;
  unitAmount: number;
  recurring: {
    interval: 'month' | 'year';
    intervalCount?: number;
  };
  metadata?: Record<string, string>;
}

export interface StripePriceResponse {
  id: string;
  productId: string;
  unitAmount: number;
  currency: string;
  recurring: {
    interval: string;
    intervalCount: number;
  };
}

export interface CreateSubscriptionPlanDTO {
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
  isPopular: boolean;
}

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
  isActive: boolean;
  isDefault: boolean;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditSubscriptionPlanDTO {
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
  isPopular: boolean;
}
