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
  isPopular: boolean;
  createdAt: string;
  updatedAt: string;
}
