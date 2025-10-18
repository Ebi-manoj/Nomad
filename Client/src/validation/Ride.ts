import z from 'zod';

export const rideSchema = z.object({
  pickup: z.object({
    description: z.string().min(1, 'Pickup location is required'),
    lat: z.number(),
    lng: z.number(),
  }),
  destination: z.object({
    description: z.string().min(1, 'Destination is required'),
    lat: z.number(),
    lng: z.number(),
  }),
  vehicleType: z.enum(['bike', 'car'], { message: 'Select vehicle type' }),
  seatsRequested: z.number().min(1).max(4),
  hasHelmet: z.boolean().optional(), // optional, not required
  vehicleModel: z.string().min(5, 'Vehicle model is required'),
  vehicleNumber: z.string().min(5, 'Vehicle number is required'),
  costPerKm: z.number().min(1, 'Cost per km required').max(15, 'Max 15'),
});

export type RideFormData = z.infer<typeof rideSchema>;
