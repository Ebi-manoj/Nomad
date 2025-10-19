export type vehicleType = 'bike' | 'car';

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

export interface RideData {
  id: string;
  userId: string;
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
  pickupAddress: string;
  destinationAddress: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleNumber: string;
  hasHelmet: boolean;
  hikersMatched: string[];
  seatsAvailable: number;
  costSharing: number;
  status: string;
  createdAt: string;
}

export interface RideState {
  rideData: RideData | null;
  loading: boolean;
  error: string;
}
