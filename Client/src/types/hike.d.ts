export interface RideMatchResponseDTO {
  rideId: string;
  rideStartLocation: GeoJSON.Point;
  rideEndLocation: GeoJSON.Point;
  currentRiderLocation: GeoJSon.Point;
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
