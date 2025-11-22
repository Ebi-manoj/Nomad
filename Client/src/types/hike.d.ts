import type { JoinRequestStatus } from '@/utils/constants';

export interface CreateJoinRequestDTO {
  rideId: string;
  hikeId: string;
  pickupLocation: {
    type: 'Point';
    coordinates: [number, number];
  };
  dropoffLocation: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export interface RideMatchResponseDTO {
  rideId: string;
  rideStartLocation: GeoJSON.Point;
  rideEndLocation: GeoJSON.Point;
  currentRiderLocation: GeoJSon.Point;
  costSharing: number;
  nearestPickup: GeoJSON.Point;
  nearestDestination: GeoJSON.Point;
  distanceAwayfromPickup: number;
  distanceAwayfromDestination: number;
  departure: number;
  seatsLeft: number;
  duration: number;
  user: {
    fullName: string;
    vehicleType: string;
    vehicleModal: string;
  };
  requestStatus: null | JoinRequestStatus;
  paymentId: null | string;
}

export interface GetHikeDetailsResponseDTO {
  hikeId: string;
  userId: string;
  pickupAddress: string;
  destinationAddress: string;
  totalDistance: number;
  hasHelmet: boolean;
  seatsRequested: number;
  status: string;
  confirmed: boolean;
  createdAt: Date;
  rider: null | {
    fullname: string;
    verified: boolean;
    rating: number;
    profilePic: string;
  };
  bookingDetails: null | {
    bookingId: string;
    pickupLocation: [number, number];
    dropOffLocation: [number, number];
    status: string;
    createdAt: Date;
    completedAt: Date | undefined;
    refundAmount: number;
    cancelledAt: Date | undefined;
  };
  paymentDetails: null | {
    paymentId: string;
    amount: number;
    platFormFee: number;
    status: PaymentStatus;
    createdAt: Date;
  };
}

export interface ReqCancelBookingResDTO {
  bookingId: string;
  refundAmount: number;
  distanceRiderAway: number;
  durationToPickup: number;
  isRiderDelay: boolean;
}
