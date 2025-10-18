import { z } from 'zod';

export const hikeSchema = z.object({
  pickup: z.object({
    description: z.string().nonempty('Pickup location is required'),
    lat: z.number(),
    lng: z.number(),
  }),
  destination: z.object({
    description: z.string().nonempty('Destination is required'),
    lat: z.number(),
    lng: z.number(),
  }),
  hasHelmet: z.boolean(),
  seatsRequested: z.number().min(1).max(3),
});

export type HikeFormData = z.infer<typeof hikeSchema>;
