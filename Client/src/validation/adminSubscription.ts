import { z } from 'zod';

export const subscriptionPlanSchema = z.object({
  tier: z
    .string()
    .min(1, 'Tier name is required')
    .max(50, 'Maximum 50 characters')
    .regex(
      /^(?=.*[A-Za-z])[A-Za-z ]+$/,
      'Tier can contain only letters and spaces'
    ),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(50, 'Maximum 50 characters')
    .refine(v => /[A-Za-z]/.test(v), 'Description must include letters'),
  badgeColor: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid color'),
  displayOrder: z.number().int().min(1, 'Display order must be at least 1'),

  features: z.object({
    maxJoinRequestsPerRide: z.number().int().positive().nullable(),
    maxRideAcceptancesPerMonth: z.number().int().positive().nullable(),
    platformFeePercentage: z
      .number()
      .min(0)
      .max(100, 'Must be between 0 and 100'),
    verificationBadge: z.boolean(),
    priorityInList: z.boolean(),
    customCostSharing: z.boolean(),
  }),

  price: z.object({
    monthly: z
      .number()
      .min(0, 'Monthly price must be positive')
      .max(100000, 'Monthly price cannot exceed ₹1,00,000'),
    yearly: z
      .number()
      .min(0, 'Yearly price must be positive')
      .max(1000000, 'Yearly price cannot exceed ₹10,00,000'),
  }),
  isActive: z.boolean(),
  isPopular: z.boolean(),
});

export type SubscriptionPlanFormData = z.infer<typeof subscriptionPlanSchema>;
