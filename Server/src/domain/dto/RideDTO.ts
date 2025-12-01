import { RideStatus, VehicleType } from '../enums/Ride';

export interface CreateRideDTO {
  userId: string;
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
  pickupAddress: string;
  destinationAddress: string;
  vehicleType: VehicleType;
  vehicleModel: string;
  vehicleNumber: string;
  hasHelmet: boolean;
  seatsAvailable: number;
  costSharing: number;
}

export interface UpdateLocationDTO {
  rideId: string;
  lat: number;
  lng: number;
}

export interface GetRidesReqDTO {
  userId: string;
  page: number;
  status?: string;
}

export interface GetRidesResDTO {
  total: number;
  rides: RideResponseDTO[];
}

export interface GetHikersMatchedReqDTO {
  userId: string;
  rideId: string;
}

export interface GetHikersMatchedResponseDTO {
  user: {
    fullName: string;
    isVerified: boolean;
    rating: number;
    profilePic: string;
  };
  hikeDetails: {
    hikeId: string;
    pickupAddress: string;
    destinationAdress: string;
    pickupLocation: { lat: number; lng: number };
    dropoffLocation: { lat: number; lng: number };
    costShared: number;
    totalDistance: number;
    seatsRequested: number;
    status: string;
  };
}

export interface EndRideReqDTO {
  userId: string;
  rideId: string;
}
export interface EndRideResDTO {
  rideId: string;
  status: string;
}

export interface GetRideDetailsReqDTO {
  userId: string;
  rideId: string;
}

export interface HikerMatchedDTO {
  bookingId: string;
  hikeId: string;
  pickupAddress: string;
  destinationAddress: string;
  amount: number;
  platformFee: number;
  status: string;
  seatsBooked: number;
  createdAt: Date;
  refundAmount: number;
  completedAt: Date | undefined;
  cancelledAt: Date | undefined;
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
  completedAt: Date | undefined;
  totalCostShared: number;
  platformFee: number;
  hikersMatched: HikerMatchedDTO[];
}

export interface RideResponseDTO {
  id: string;
  userId: string;
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
  pickupAddress: string;
  destinationAddress: string;
  totalDistance: number;
  vehicleType: VehicleType;
  vehicleModel: string;
  vehicleNumber: string;
  hasHelmet: boolean;
  seatsAvailable: number;
  costSharing: number;
  status: RideStatus;
  createdAt: Date;
}
