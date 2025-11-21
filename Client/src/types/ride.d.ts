import type { JoinRequestStatus } from '@/utils/constants';

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
    rating?: number;
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
  status: string;
  seatsBooked: number;
  createdAt: Date;
  completedAt: Date | undefined;
  hiker: {
    userId: string;
    fullName: string;
    profilePic: string;
    rating: number;
    verified: boolean;
  };
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
  hikersMatched: HikerMatchedDTO[];
}
