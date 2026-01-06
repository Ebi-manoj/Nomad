import z from 'zod';

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name is too long'),
  mobile: z
    .union([z.string().trim().regex(/^[6-9]\d{9}$/, 'Invalid mobile number'), z.literal('')])
    .optional(),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
