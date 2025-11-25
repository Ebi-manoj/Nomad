import { z } from 'zod';

export const sosContactFormSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' }),
  phone: z
    .string({ message: 'Phone is required' })
    .trim()
    .min(6, { message: 'Phone number is too short' })
    .max(10, { message: 'Invalid phone No format' }),
  relation: z.string().trim().max(30).optional(),
});

export type SosContactFormData = z.infer<typeof sosContactFormSchema>;
