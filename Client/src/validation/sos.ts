import { z } from 'zod';

export const sosContactFormSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .refine(v => !/^[_\s]+$/.test(v), {
      message: 'Invalid name',
    }),
  phone: z
    .string({ message: 'Phone is required' })
    .trim()
    .min(6, { message: 'Phone number is too short' })
    .max(10, { message: 'Invalid phone No format' })
    .refine(v => !/^[_\s]+$/.test(v), {
      message: 'Invalid phone No format',
    }),
  email: z.string().trim().email({ message: 'Invalid email address' }).optional(),
  relation: z
    .string()
    .trim()
    .max(30)
    .refine(v => (v.length ? !/^[_\s]+$/.test(v) : true), {
      message: 'Invalid relation',
    })
    .optional(),
});

export type SosContactFormData = z.infer<typeof sosContactFormSchema>;
