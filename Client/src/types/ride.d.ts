import type { JoinRequestStatus } from '@/utils/constants';
import type { ReviewResponseDTO } from './review';
import type { SubscriptionTierType } from './subscription';

export interface RideRequestDTO {
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
    isVerified: boolean;
    rating?: number;
    subscriptionTier: SubscriptionTierType;
    badgeColor: string;
  };
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

export interface DeclineJoinResponseDTO {
  joinRequestId: string;
  rideId: string;
  hikeId: string;
  status: JoinRequestStatus;
}

export interface HikerMatchedDTO {
  bookingId: string;
  hikeId: string;
  pickupAddress: string;
  destinationAddress: string;
  amount: number;
  platformFee: number;
  totalDistance: number;
  status: string;
  seatsBooked: number;
  createdAt: Date;
  completedAt: Date | undefined;
  cancelledAt: Date | undefined;
  refundAmount: number;
  hiker: {
    userId: string;
    fullName: string;
    profilePic: string;
    rating: number;
    verified: boolean;
    subscriptionTier: SubscriptionTierType;
    badgeColor: string;
  };
  review: ReviewResponseDTO | null;
}

export interface GetRideDetailsResDTO {
  rideId: string;
  userId: string;
  startAddress: string;
  endAddress: string;
  totalDistance: number;
  vehicleType: string;
  vehicleModel: string;
  vehicleNumber: string;
  hasHelmet: boolean;
  costSharing: number;
  status: RideStatus;
  createdAt: Date;
  completedAt: Date | null;
  totalCostShared: number;
  platformFee: number;
  safetyScore?: number | null;
  hikersMatched: HikerMatchedDTO[];
}

export interface RideActivityItemDTO {
  id: string;
  userId: string;
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
  pickupAddress: string;
  destinationAddress: string;
  totalDistance: number;
  vehicleType: string;
  vehicleModel: string;
  vehicleNumber: string;
  hasHelmet: boolean;
  seatsAvailable: number;
  costSharing: number;
  status: RideStatus;
  createdAt: Date;
}

export interface GetRidesResDTO {
  total: number;
  rides: RideActivityItemDTO[];
}
