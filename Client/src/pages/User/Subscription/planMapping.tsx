import type React from 'react';
import { Crown, Mountain, CarFront, User, Shield } from 'lucide-react';
import type {
  Pricing,
  SubscriptionTierType,
  SubscriptionPlanDTO,
} from '@/types/subscription';

export type PlanFeature = { included: boolean; text: string; subtext?: string };

export type MappedPlan = {
  id: string;
  code: SubscriptionTierType;
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

export const getColorForTier = (
  tier: string
): 'amber' | 'emerald' | 'blue' | 'slate' => {
  const t = tier.toUpperCase();
  if (t.includes('PREMIUM')) return 'amber';
  if (t.includes('HIKER')) return 'emerald';
  if (t.includes('RIDER')) return 'blue';
  return 'emerald';
};

export const mapSubscriptionPlans = (
  data: SubscriptionPlanDTO[]
): MappedPlan[] =>
  data
    .filter(p => p.isActive)
    .map(p => {
      const t = p.tier;
      const maxJoin = p.features.maxJoinRequestsPerRide;
      const maxAccept = p.features.maxRideAcceptancesPerMonth;
      return {
        id: p.id,
        code: t as SubscriptionTierType,
        title: t,
        description: p.description,
        popular: p.isPopular,
        price: p.price,
        platformFee: `${p.features.platformFeePercentage}%`,
        features: [
          {
            included: maxJoin === null ? true : maxJoin > 0,
            text: 'Join Requests Per Ride',
            subtext: maxJoin === null ? 'Unlimited' : `${maxJoin} per ride`,
          },
          {
            included: maxAccept === null ? true : maxAccept > 0,
            text: 'Ride Acceptances Per Month',
            subtext: maxAccept === null ? 'Unlimited' : `${maxAccept} / month`,
          },
          {
            included: p.features.verificationBadge,
            text: 'Verification Badge',
          },
          {
            included: p.features.priorityInList,
            text: 'Priority in List',
          },
          {
            included: p.features.customCostSharing,
            text: 'Custom Cost Sharing',
          },
        ],
        icon: getIconForTier(t),
        color: getColorForTier(t),
        cta: 'Choose Plan',
      };
    });
