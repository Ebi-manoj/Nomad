import type { SubscriptionTierType } from '@/types/subscription';

export type RideBookingStatus =
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'PICKED UP'
  | 'DROPPED OFF';

export interface RideBookingResponseDTO {
  rideBooking: {
    bookingId: string;
    bookingNumber: string;
    rideId: string;
    hikeId: string;
    riderId: string;
    hikerId: string;
    seatsBooked: number;
    amount: number;
    platformFee: number;
    pickupLocation: [number, number];
    dropoffLocation: [number, number];
    status: RideBookingStatus;
  };
  rider: {
    name: string;
    rating: number;
    vehicleNumber: string;
    vehicleModel: string;
    currentLocation: { lat: number; lng: number };
    subscriptionTier: SubscriptionTierType;
    badgeColor: string;
    profilePic?: string;
  };
  rideDetails: {
    pickupAddress: string;
    dropoffAddress: string;
    departure: number;
    distance: number;
    duration: number;
  };
}

export interface BookingLiveResDTO {
  currentLocation: { lat: number; lng: number };
  departure: number;
  status: RideBookingStatus;
}

export interface RideBookingState {
  booking: RideBookingResponseDTO | null;
  loading: boolean;
  error: string;
}
