import { Position } from 'geojson';
import { RideBookingStatus } from '../enums/RideBooking';

export interface RideBookingRequestDTO {
  bookingId: string;
  userId: string;
}

export interface RideBookingResponseDTO {
  rideBooking: {
    bookingId: string;
    rideId: string;
    hikeId: string;
    riderId: string;
    hikerId: string;
    seatsBooked: number;
    amount: number;
    platformFee: number;
    pickupLocation: Position;
    dropoffLocation: Position;
    status: string;
  };
  rider: {
    name: string;
    rating: number;
    vehicleNumber: string;
    vehicleModel: string;
    currentLocation: { lat: number; lng: number };
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
