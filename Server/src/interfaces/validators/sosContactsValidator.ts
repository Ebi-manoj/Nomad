import { z } from 'zod';

export const sosContactSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .trim()
    .min(1, { message: 'Name is required' }),
  phone: z
    .string({ message: 'Phone is required' })
    .trim()
    .min(6, { message: 'Phone number is too short' }),
  relation: z.string().trim().optional(),
});

export const saveSosContactsSchema = sosContactSchema;

export const triggerSosSchema = z.object({
  bookingId: z
    .string({ message: 'Booking id is required' })
    .trim()
    .min(1, { message: 'Booking id is required' }),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});
