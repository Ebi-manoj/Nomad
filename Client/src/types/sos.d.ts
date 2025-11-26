export interface SosContactDTO {
  name: string;
  phone: string;
  relation?: string;
}

export interface SosContactsResDTO {
  userId: string;
  contacts: SosContactDTO[];
}

export interface TriggerSosHikerDTO {
  bookingId: string;
  location: { lat: number; lng: number } | null;
}
export interface TriggerSosRiderDTO {
  rideId: string;
  location?: { lat: number; lng: number };
}
