import { HikeStatus } from '../enums/Hike';
import { PaymentStatus } from '../enums/payment';
import { ReviewType } from '../enums/Reviews';
import { JoinRequestStatus } from '../enums/Ride';
import { ReviewResponseDTO } from './Reviews';

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
  bookingId: string | null;
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

export interface GetHikeDetailsReqDTO {
  userId: string;
  hikeId: string;
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
  riderId: string | null;
  createdAt: Date;
  rider: null | {
    fullname: string;
    verified: boolean;
    rating: number;
    profilePic: string;
  };
  bookingDetails: null | {
    bookingId: string;
    bookingNumber: string;
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
  review: null | ReviewResponseDTO;
}

export interface GetHikesReqDTO {
  userId: string;
  page: number;
  status?: string;
}
export interface GetHikesResDTO {
  total: number;
  hikes: HikeResponseDTO[];
}
