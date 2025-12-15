import z from 'zod';

const featuresSchema = z.object({
  maxJoinRequestsPerRide: z.number().int().positive().nullable(),
  maxRideAcceptancesPerMonth: z.number().int().positive().nullable(),
  platformFeePercentage: z.number().min(0).max(100),
  verificationBadge: z.boolean(),
  priorityInList: z.boolean(),
  customCostSharing: z.boolean(),
});

export const createPlanSchema = z.object({
  tier: z.string().trim().min(1, { message: 'tier is required' }),
  description: z.string().trim().min(1, { message: 'description is required' }),
  imageUrl: z.string().url({ message: 'imageUrl must be a valid URL' }),
  isPopular: z.boolean().optional().default(false),
  price: z.object({
    monthly: z.number().positive(),
    yearly: z.number().positive(),
  }),
  features: featuresSchema,
});
