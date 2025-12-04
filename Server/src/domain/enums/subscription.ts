export enum SubscriptionTier {
  FREE = 'FREE',
  HIKER_PRO = 'HIKER_PRO',
  RIDER_PRO = 'RIDER_PRO',
  PREMIUM_PLUS = 'PREMIUM_PLUS',
}

export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
}

export enum UserRole {
  HIKER = 'HIKER',
  RIDER = 'RIDER',
}

// Mapping of Stripe Price IDs by tier and billing cycle.
export type PriceIdMapping = Record<
  SubscriptionTier,
  Partial<Record<BillingCycle, string | undefined>>
>;
