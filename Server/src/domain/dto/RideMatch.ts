import { Position } from 'geojson';

export interface RideMatchDTO {
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
}

export interface RideMatchResponseDTO {
  rideId: string;
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
}
