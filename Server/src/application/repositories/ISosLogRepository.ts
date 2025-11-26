import { SosLog } from '../../domain/entities/SosLog';
import { SosLogStatus } from '../../domain/enums/SosLogStatus';
import { IBaseRepository } from './IBaseRepository';

export interface ISosLogRepository extends IBaseRepository<SosLog> {
  findByBookingId(bookingId: string): Promise<SosLog | null>;
  findByRideId(rideId: string): Promise<SosLog | null>;
  findAll(
    skip: number,
    limit: number,
    filter?: { status?: string }
  ): Promise<SosLog[]>;
  countDocuments(filter?: { status?: string }): Promise<number>;
}
