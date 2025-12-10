import { Types } from 'mongoose';
import { SosLog } from '../../domain/entities/SosLog';
import { ISosLogModel } from '../database/sosLog.model';
import { IMapper } from './IMapper';

export const sosLogMapper: IMapper<SosLog, ISosLogModel> = {
  toPersistence(domain: SosLog): Partial<ISosLogModel> {
    return {
      userId: new Types.ObjectId(domain.getUserId()),
      bookingId: domain.getBookingId()
        ? new Types.ObjectId(domain.getBookingId())
        : undefined,
      rideId: new Types.ObjectId(domain.getRideId()),
      location: domain.getLocation(),
      initiatedBy: domain.getInitiatedBy(),
      status: domain.getStatus(),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
    };
  },

  toDomain(doc: ISosLogModel): SosLog {
    return new SosLog({
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      bookingId: doc.bookingId ? doc.bookingId.toString() : undefined,
      rideId: doc.rideId.toString(),
      location: doc.location,
      initiatedBy: doc.initiatedBy,
      status: doc.status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  },
};
