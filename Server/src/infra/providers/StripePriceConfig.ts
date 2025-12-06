import {
  BillingCycle,
  PriceIdMapping,
  SubscriptionTier,
} from '../../domain/enums/subscription';
import { env } from '../utils/env';

export const stripePriceConfig: PriceIdMapping = {
  [SubscriptionTier.FREE]: {
    [BillingCycle.MONTHLY]: undefined,
    [BillingCycle.YEARLY]: undefined,
  },
  [SubscriptionTier.HIKER_PRO]: {
    [BillingCycle.MONTHLY]: env.STRIPE_HIKER_PRO_MONTHLY,
    [BillingCycle.YEARLY]: env.STRIPE_HIKER_PRO_YEARLY,
  },
  [SubscriptionTier.RIDER_PRO]: {
    [BillingCycle.MONTHLY]: env.STRIPE_RIDER_PRO_MONTHLY,
    [BillingCycle.YEARLY]: env.STRIPE_RIDER_PRO_YEARLY,
  },
  [SubscriptionTier.PREMIUM_PLUS]: {
    [BillingCycle.MONTHLY]: env.STRIPE_PREMIUM_PLUS_MONTHLY,
    [BillingCycle.YEARLY]: env.STRIPE_PREMIUM_PLUS_YEARLY,
  },
};

export function findPlanByPriceId(priceId: string):
  | { tier: SubscriptionTier; billingCycle: BillingCycle }
  | null {
  for (const tier of Object.values(SubscriptionTier)) {
    const mapping = stripePriceConfig[tier as SubscriptionTier];
    for (const cycle of Object.values(BillingCycle)) {
      if (mapping?.[cycle as BillingCycle] === priceId) {
        return { tier: tier as SubscriptionTier, billingCycle: cycle as BillingCycle };
      }
    }
  }
  return null;
}
