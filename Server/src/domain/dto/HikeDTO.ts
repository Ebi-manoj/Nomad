import { HikeStatus } from '../enums/Hike';
import { JoinRequestStatus } from '../enums/Ride';

export interface CreateHikeDTO {
  userId: string;
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
  pickupAddress: string;
  destinationAddress: string;
  hasHelmet: boolean;
  seatsRequested: number;
}

export interface HikeResponseDTO {
  id: string;
  userId: string;
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
  pickupAddress: string;
  destinationAddress: string;
  totalDistance: number;
  status: HikeStatus;
  hasHelmet: boolean;
  seatsRequested: number;
  estimatedPrice: number;
  riderId: string | null;
  confirmed: boolean;
  createdAt: Date;
}

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
export interface JoinRequestResponseDTO {
  id: string;
  rideId: string;
  status: JoinRequestStatus;
  seatsRequested: number;
  pickupLocation: GeoJSON.Point;
  dropoffLocation: GeoJSON.Point;
  hikerPickupAddress: string;
  hikerDestinationAddress: string;
  totalDistance: number;
  costSharing: number;
  createdAt: Date;
  updatedAt: Date;
  hiker: {
    id: string;
    fullName: string;
    profilePicture?: string;
    rating?: number;
  };
}
