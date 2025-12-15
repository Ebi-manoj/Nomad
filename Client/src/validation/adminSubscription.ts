import { z } from 'zod';

export const subscriptionPlanSchema = z.object({
  tier: z.string().min(1, 'Tier name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),

  features: z.object({
    maxJoinRequestsPerRide: z.number().int().min(1, 'Must be at least 1'),
    maxRideAcceptancesPerMonth: z.number().int().min(1, 'Must be at least 1'),
    platformFeePercentage: z
      .number()
      .min(0)
      .max(100, 'Must be between 0 and 100'),
    verificationBadge: z.boolean(),
    priorityInList: z.boolean(),
    customCostSharing: z.boolean(),
  }),

  price: z.object({
    monthly: z.number().min(0, 'Monthly price must be positive'),
    yearly: z.number().min(0, 'Yearly price must be positive'),
  }),

  stripeId: z.object({
    monthly: z.string().min(1, 'Monthly Stripe Price ID is required'),
    yearly: z.string().min(1, 'Yearly Stripe Price ID is required'),
  }),

  isActive: z.boolean(),
  isPopular: z.boolean(),
});

export type SubscriptionPlanFormData = z.infer<typeof subscriptionPlanSchema>;
