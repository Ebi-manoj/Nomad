import { SosLog } from '../../domain/entities/SosLog';
import { ISosLogRepository } from '../repositories/ISosLogRepository';
import { ILocationResolver } from './ILocationResolver';
import { ISosService, CreateSosLogParams } from './ISosService';
import { sosLogMapper } from '../mappers/SosLogMapper';
import { SosLogResDTO } from '../../domain/dto/SosDTO';

export class SosService implements ISosService {
  constructor(
    private readonly sosLogRepository: ISosLogRepository,
    private readonly locationResolver: ILocationResolver
  ) {}

  async createSosLog(params: CreateSosLogParams): Promise<SosLogResDTO> {
    const resolvedLocation = await this.locationResolver.resolveLocation(
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

    const saved = await this.sosLogRepository.create(sosLog);
    return sosLogMapper(saved);
  }
}
