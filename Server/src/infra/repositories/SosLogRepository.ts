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

  async findByBookingId(bookingId: string): Promise<SosLog[]> {
    const docs = await this.model.find({ bookingId });
    return docs.map(doc => this.mapper.toDomain(doc));
  }
}
