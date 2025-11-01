import type { JoinRequestStatus } from '@/utils/constants';

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
  requestStatus: null | JoinRequestStatus;
}
