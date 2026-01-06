import { Position } from 'geojson';
import { RideBookingStatus } from '../enums/RideBooking';

export interface BookingResponseDTO {
  bookingId: string;
  bookingNumber: string;
  rideId: string;
  hikeId: string;
  riderId: string;
  hikerId: string;
  seatsBooked: number;
  amount: number;
  platformFee: number;
  refundAmount?: number;
  pickupLocation: Position;
  dropoffLocation: Position;
  status: string;
  createdAt: Date;
}

export interface RideBookingRequestDTO {
  bookingId: string;
  userId: string;
}

export interface RideBookingResponseDTO {
  rideBooking: BookingResponseDTO;
  rider: {
    name: string;
    rating: number;
    vehicleNumber: string;
    vehicleModel: string;
    currentLocation: { lat: number; lng: number };
    subscriptionTier: string;
    badgeColor: string;
  };
  rideDetails: {
    pickupAddress: string;
    dropoffAddress: string;
    departure: number;
    distance: number;
    duration: number;
  };
}

export interface RideBookingOTPReqDTO {
  rideBookingId: string;
  userId: string;
}

export interface BookingLiveReqDTO {
  bookingId: string;
  userId: string;
}

export interface BookingLiveResDTO {
  currentLocation: { lat: number; lng: number };
  departure: number;
  status: RideBookingStatus;
}

export interface RefundServiceResDTO {
  distance: number;
  duration: number;
  refundAmount: number;
  isRiderDelay: boolean;
}

export interface ReqCancelBookingReqDTO {
  bookingId: string;
  userId: string;
}

export interface ReqCancelBookingResDTO {
  bookingId: string;
  refundAmount: number;
  distanceRiderAway: number;
  durationToPickup: number;
  isRiderDelay: boolean;
}

export interface CancelRideBookingReqDTO {
  bookingId: string;
  userId: string;
}

export interface CancelRideBookingResDTO {
  bookingId: string;
  status: RideBookingStatus;
  refundAmount: number;
  distanceToRider: number;
  etaMinutes: number;
}
