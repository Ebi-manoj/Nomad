import { SosLogResDTO } from '../../domain/dto/SosDTO';
import { SosInitiator } from '../../domain/enums/SosInitiator';

export interface CreateSosLogParams {
  userId: string;
  rideId: string;
  bookingId?: string;
  initiatedBy: SosInitiator;
  location?: { lat: number; lng: number };
}

export interface ISosService {
  createSosLog(params: CreateSosLogParams): Promise<SosLogResDTO>;
}
