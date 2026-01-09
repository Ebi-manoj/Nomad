import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, { message: 'Please select at least 1 star' })
    .max(5, { message: 'Maximum rating is 5 stars' }),
  reviewText: z
    .string()
    .trim()
    .min(10, { message: 'Please write at least 10 characters' })
    .max(100, { message: 'Feedback must be under 100 characters' }),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
