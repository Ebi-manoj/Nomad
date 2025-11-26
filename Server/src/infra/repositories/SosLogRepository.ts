import { MongoBaseRepository } from './BaseRepository';
import { ISosLogRepository } from '../../application/repositories/ISosLogRepository';
import { SosLog } from '../../domain/entities/SosLog';
import { ISosLogModel, SosLogModel } from '../database/sosLog.model';
import { sosLogMapper } from '../mappers/sosLogMapper';

export class SosLogRepository
  extends MongoBaseRepository<SosLog, ISosLogModel>
  implements ISosLogRepository
{
  constructor() {
    super(SosLogModel, sosLogMapper);
  }

  async findByBookingId(bookingId: string): Promise<SosLog | null> {
    const doc = await this.model.findOne({ bookingId });
    return doc ? this.mapper.toDomain(doc) : null;
  }
  async findByRideId(rideId: string): Promise<SosLog | null> {
    const doc = await this.model.findOne({ rideId });
    return doc ? this.mapper.toDomain(doc) : null;
  }
}
