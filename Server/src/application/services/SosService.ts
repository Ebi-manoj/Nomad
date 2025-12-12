import { SosLog } from '../../domain/entities/SosLog';
import { ISosLogRepository } from '../repositories/ISosLogRepository';
import { ILocationResolver } from './ILocationResolver';
import { ISosService, CreateSosLogParams } from './ISosService';
import { sosLogMapper } from '../mappers/SosLogMapper';
import { SosLogResDTO } from '../../domain/dto/SosDTO';

export class SosService implements ISosService {
  constructor(
    private readonly _sosLogRepository: ISosLogRepository,
    private readonly _locationResolver: ILocationResolver
  ) {}

  async createSosLog(params: CreateSosLogParams): Promise<SosLogResDTO> {
    const existingSos = await this.checkExistingSos(
      params.userId,
      params.rideId,
      params.bookingId
    );

    if (existingSos) {
      return sosLogMapper(existingSos);
    }

    const resolvedLocation = await this._locationResolver.resolveLocation(
      params.location,
      params.rideId
    );

    const sosLog = new SosLog({
      userId: params.userId,
      rideId: params.rideId,
      bookingId: params.bookingId,
      location: resolvedLocation,
      initiatedBy: params.initiatedBy,
    });

    const saved = await this._sosLogRepository.create(sosLog);
    return sosLogMapper(saved);
  }

  private checkExistingSos(
    userId: string,
    rideId: string,
    bookingId?: string
  ): Promise<SosLog | null> {
    if (bookingId) {
      return this._sosLogRepository.findByBookingId(bookingId);
    }
    return this._sosLogRepository.findByRiderAndRideId(rideId, userId);
  }
}
