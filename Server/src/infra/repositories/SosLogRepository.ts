import { MongoBaseRepository } from './BaseRepository';
import { ISosLogRepository } from '../../application/repositories/ISosLogRepository';
import { SosLog } from '../../domain/entities/SosLog';
import { SosLogStatus } from '../../domain/enums/SosLogStatus';
import { ISosLogModel, SosLogModel } from '../database/sosLog.model';
import { sosLogMapper } from '../mappers/sosLogMapper';
import { FilterQuery, Types } from 'mongoose';

type SosQuery = FilterQuery<ISosLogModel>;

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
  async findByRiderAndRideId(
    rideId: string,
    riderId: string
  ): Promise<SosLog | null> {
    const doc = await this.model.findOne({ rideId, userId: riderId });
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findAllFiltered(
    skip: number,
    limit: number,
    filter?: {
      status?: SosLogStatus;
      userIds?: string[];
      sort?: 'newest' | 'oldest';
    }
  ): Promise<SosLog[]> {
    const query: SosQuery = {};

    if (filter?.status) {
      query.status = filter.status;
    }
    if (filter?.userIds && filter.userIds.length > 0) {
      query.userId = {
        $in: filter.userIds.map(id => new Types.ObjectId(id)),
      };
    }

    const sortOrder = filter?.sort === 'oldest' ? 1 : -1;
    const docs = await this.model
      .find(query)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit);

    return docs.map(doc => this.mapper.toDomain(doc));
  }
  async countDocumentsFiltered(filter?: {
    status?: SosLogStatus;
    userIds?: string[];
  }): Promise<number> {
    const query: SosQuery = {};

    if (filter?.status) {
      query.status = filter.status;
    }
    if (filter?.userIds && filter.userIds.length > 0) {
      query.userId = {
        $in: filter.userIds.map(id => new Types.ObjectId(id)),
      };
    }
    return await this.model.countDocuments(query);
  }
}
