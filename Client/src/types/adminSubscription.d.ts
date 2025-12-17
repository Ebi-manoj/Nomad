export interface AdminSubscriptionPlanDTO {
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
  price: { monthly: number; yearly: number };
  stripeId: { monthly: string; yearly: string };
  isActive: boolean;
  isDefault: boolean;
  isPopular: boolean;
  createdAt: string;
  updatedAt: string;
}
export type Pricing = {
  monthly: number;
  yearly: number;
};

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
