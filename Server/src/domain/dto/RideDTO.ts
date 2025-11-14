import { VehicleType } from '../enums/Ride';

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
