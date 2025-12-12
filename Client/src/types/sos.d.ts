export interface SosContactDTO {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relation?: string;
}

export interface SosContactsResDTO {
  userId: string;
  contacts: SosContactDTO[];
}

export interface DeleteSosContactResDTO {
  id: string;
  message: string;
}

export interface TriggerSosHikerDTO {
  bookingId: string;
  location: { lat: number; lng: number } | null;
}
export interface TriggerSosRiderDTO {
  rideId: string;
  location?: { lat: number; lng: number };
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
