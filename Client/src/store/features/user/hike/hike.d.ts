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
  id: string;
  userId: string;
  pickup: GeoJSON.Point;
  destination: GeoJSON.Point;
  pickupAddress: string;
  destinationAddress: string;
  totalDistance: number;
  status: HikeStatus;
  hasHelmet: boolean;
  seatsRequested: number;
  estimatedPrice: number;
  riderId: string | null;
  bookingId: string | null;
  confirmed: boolean;
  createdAt: Date;
}
export interface HikeState {
  hikeData: HikeResponseDTO | null;
  loading: boolean;
  error: string;
}
