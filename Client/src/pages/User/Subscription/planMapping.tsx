import type React from 'react';
import { Crown, Mountain, CarFront, User, Shield } from 'lucide-react';
import type {
  Pricing,
  SubscriptionFeatures,
  SubscriptionPlanDTO,
} from '@/types/subscription';

export type PlanFeature = {
  included: boolean;
  text: string;
  subtext?: string;
};

export type DisplayFeature = {
  text: string;
  enabled: boolean;
};

export type MappedPlan = {
  id: string;
  code: string;
  title: string;
  description: string;
  popular: boolean;
  price: Pricing;
  platformFee: string | number;
  features: PlanFeature[];
  icon: React.ReactNode;
  color: 'amber' | 'emerald' | 'blue' | 'slate';
  cta: string;
};

// Icons
export const getIconForTier = (tier: string): React.ReactNode => {
  const t = tier.toUpperCase();
  if (t.includes('PREMIUM'))
    return <Crown className="w-6 h-6 text-amber-500" />;
  if (t.includes('HIKER'))
    return <Mountain className="w-6 h-6 text-emerald-500" />;
  if (t.includes('RIDER'))
    return <CarFront className="w-6 h-6 text-blue-500" />;
  if (t.includes('FREE')) return <User className="w-6 h-6 text-slate-600" />;
  return <Shield className="w-6 h-6 text-slate-600" />;
};

// Colors
export const getColorForTier = (
  tier: string
): 'amber' | 'emerald' | 'blue' | 'slate' => {
  const t = tier.toUpperCase();
  if (t.includes('PREMIUM')) return 'amber';
  if (t.includes('HIKER')) return 'emerald';
  if (t.includes('RIDER')) return 'blue';
  return 'slate';
};

export const formatPlanFeatures = (
  features: SubscriptionFeatures
): PlanFeature[] => {
  const maxJoin = features.maxJoinRequestsPerRide;
  const maxAccept = features.maxRideAcceptancesPerMonth;

  return [
    {
      included: maxJoin === null ? true : maxJoin > 0,
      text: 'Join Requests Per Ride',
      subtext:
        maxJoin === null
          ? 'Unlimited'
          : maxJoin === 0
          ? 'Not available'
          : `${maxJoin} per ride`,
    },
    {
      included: maxAccept === null ? true : maxAccept > 0,
      text: 'Ride Acceptances Per Month',
      subtext:
        maxAccept === null
          ? 'Unlimited'
          : maxAccept === 0
          ? 'Not available'
          : `${maxAccept} / month`,
    },
    {
      included: features.verificationBadge,
      text: 'Verification Badge',
    },
    {
      included: features.priorityInList,
      text: 'Priority in List',
    },
    {
      included: features.customCostSharing,
      text: 'Custom Cost Sharing',
    },
  ];
};

export const formatSubscriptionFeatures = (
  features: SubscriptionFeatures
): DisplayFeature[] => {
  const formattedFeatures: DisplayFeature[] = [];

  // Max Join Requests
  if (
    features.maxJoinRequestsPerRide !== null &&
    features.maxJoinRequestsPerRide !== 0
  ) {
    formattedFeatures.push({
      text:
        features.maxJoinRequestsPerRide === -1 ||
        features.maxJoinRequestsPerRide === null
          ? 'Unlimited join requests per ride'
          : `Up to ${features.maxJoinRequestsPerRide} join requests per ride`,
      enabled: true,
    });
  }

  // Max Ride Acceptances
  if (
    features.maxRideAcceptancesPerMonth !== null &&
    features.maxRideAcceptancesPerMonth !== 0
  ) {
    formattedFeatures.push({
      text:
        features.maxRideAcceptancesPerMonth === -1 ||
        features.maxRideAcceptancesPerMonth === null
          ? 'Unlimited ride acceptances per month'
          : `Up to ${features.maxRideAcceptancesPerMonth} ride acceptances per month`,
      enabled: true,
    });
  }

  // Platform Fee
  formattedFeatures.push({
    text: `${features.platformFeePercentage}% platform fee`,
    enabled: true,
  });

  // Verification Badge
  if (features.verificationBadge) {
    formattedFeatures.push({
      text: 'Verified badge on profile',
      enabled: true,
    });
  }

  // Priority in List
  if (features.priorityInList) {
    formattedFeatures.push({
      text: 'Priority placement in ride listings',
      enabled: true,
    });
  }

  // Custom Cost Sharing
  if (features.customCostSharing) {
    formattedFeatures.push({
      text: 'Custom cost-sharing options',
      enabled: true,
    });
  }

  return formattedFeatures;
};

// Map plans for comparison view
export const mapSubscriptionPlans = (
  data: SubscriptionPlanDTO[]
): MappedPlan[] =>
  data
    .filter(p => p.isActive)
    .map(p => ({
      id: p.id,
      code: p.tier,
      title: p.tier,
      description: p.description,
      popular: p.isPopular,
      price: p.price,
      platformFee: `${p.features.platformFeePercentage}%`,
      features: formatPlanFeatures(p.features),
      icon: getIconForTier(p.tier),
      color: getColorForTier(p.tier),
      cta: 'Choose Plan',
    }));
