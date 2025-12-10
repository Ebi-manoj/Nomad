export interface CreateDeviationReqDTO {
  rideId: string;
  location: { lat: number; lng: number };
  deviationDistance: number;
}
export interface RouteDeviationResDTO {
  id: string;
  rideId: string;
  hikeId: string;
  riderId: string;
  hikerId: string;
  currentLocation: GeoJSON.Point;
  deviationDistance: number;
  acknowledged: boolean;
  detectedAt: Date;
  acknowledgedAt?: Date;
  sosTriggeredAt?: Date;
}
