import { SosLogStatus } from '../enums/SosLogStatus';
import { SosInitiator } from '../enums/SosInitiator';
import { UserResponseDTO } from './authDTO';

export interface SosContactDTO {
  name: string;
  phone: string;
  email?: string;
  relation?: string;
}

export interface SaveSosContactsReqDTO {
  userId: string;
  contact: SosContactDTO;
}

export interface SaveSosContactsResDTO {
  userId: string;
  contacts: SosContactDTO[];
}

export interface TriggerSosReqDTO {
  userId: string;
  bookingId: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface TriggerRideSosReqDTO {
  userId: string;
  rideId: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface SosLogResDTO {
  id: string;
  userId: string;
  rideId: string | null;
  bookingId: string | null;
  location: {
    lat: number;
    lng: number;
  };
  initiatedBy: SosInitiator;
  status: SosLogStatus;
  triggeredAt: Date;
}

export interface GetSosLogsQuery {
  status?: string;
  page: number;
}

export interface SosLogResWithUser extends SosLogResDTO {
  initiaterDetails: UserResponseDTO;
}

export interface GetSosLogsResDTO {
  logs: SosLogResWithUser[];
  totalCount: number;
}
