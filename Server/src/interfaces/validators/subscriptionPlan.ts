import z from 'zod';

const featuresSchema = z.object({
  maxJoinRequestsPerRide: z.number().int().positive().nullable(),
  maxRideAcceptancesPerMonth: z.number().int().positive().nullable(),
  platformFeePercentage: z.number().min(0).max(100),
  verificationBadge: z.boolean(),
  priorityInList: z.boolean(),
  customCostSharing: z.boolean(),
});
export const subscriptionPlanSchema = z
  .object({
    tier: z.string().trim().min(1, { message: 'tier is required' }),
    description: z
      .string()
      .trim()
      .min(1, { message: 'description is required' }),
    badgeColor: z
      .string()
      .trim()
      .regex(/^#([0-9a-fA-F]{3}){1,2}$/i, { message: 'invalid color' }),
    displayOrder: z
      .number()
      .int()
      .min(1, { message: 'displayOrder must be at least 1' }),
    isDefault: z.boolean().optional(),
    isPopular: z.boolean().optional().default(false),
    price: z.object({
      monthly: z.number().min(0),
      yearly: z.number().min(0),
    }),
    features: featuresSchema,
  })
  .superRefine((data, ctx) => {
    if (!data.isDefault) {
      if (data.price.monthly <= 0) {
        ctx.addIssue({
          path: ['price', 'monthly'],
          code: z.ZodIssueCode.custom,
          message: 'Monthly price must be greater than 0 for paid plans',
        });
      }

      if (data.price.yearly <= 0) {
        ctx.addIssue({
          path: ['price', 'yearly'],
          code: z.ZodIssueCode.custom,
          message: 'Yearly price must be greater than 0 for paid plans',
        });
      }
    }
  });
