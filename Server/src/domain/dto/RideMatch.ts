import { JoinRequestStatus } from '../enums/Ride';

export interface RideMatchDTO {
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
}

export interface RideMatchResponseDTO {
  rideId: string;
  rideStartLocation: GeoJSON.Point;
  rideEndLocation: GeoJSON.Point;
  currentRiderLocation: GeoJSON.Point;
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
}

export interface AcceptJoinRequestDTO {
  joinRequestId: string;
  riderId: string;
}

export interface AcceptJoinResponseDTO {
  joinRequestId: string;
  paymentId: string;
  hikerId: string;
  hikeId: string;
  amount: number;
  platformFee: number;
  status: JoinRequestStatus;
  expiresAt: Date;
}

export interface DeclineJoinRequestDTO {
  joinRequestId: string;
  riderId: string;
}

export interface DeclineJoinResponseDTO {
  joinRequestId: string;
  hikeId: string;
  rideId: string;
  status: JoinRequestStatus;
}
