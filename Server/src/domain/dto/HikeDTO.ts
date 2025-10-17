import { HikeStatus } from '../enums/Hike';

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
  hikeId: string;
  userId: string;
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
  totalDistance: number;
  status: HikeStatus;
  estimatedPrice: number;
  confirmed: boolean;
  createdAt: Date;
}
