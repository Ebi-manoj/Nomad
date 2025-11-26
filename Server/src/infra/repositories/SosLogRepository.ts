import { MongoBaseRepository } from './BaseRepository';
import { ISosLogRepository } from '../../application/repositories/ISosLogRepository';
import { SosLog } from '../../domain/entities/SosLog';
import { SosLogStatus } from '../../domain/enums/SosLogStatus';
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

  async findAll(
    skip: number,
    limit: number,
    filter?: { status?: SosLogStatus }
  ): Promise<SosLog[]> {
    const query: Partial<ISosLogModel> = {};

    if (filter?.status) {
      query.status = filter.status;
    }

    const docs = await this.model
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return docs.map(doc => this.mapper.toDomain(doc));
  }
  async countDocuments(filter?: { status?: SosLogStatus }): Promise<number> {
    const query: Partial<ISosLogModel> = {};

    if (filter?.status) {
      query.status = filter.status;
    }
    return await this.model.countDocuments(query);
  }
}
