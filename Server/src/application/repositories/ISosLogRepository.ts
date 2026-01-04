import { SosLog } from '../../domain/entities/SosLog';
import { IBaseRepository } from './IBaseRepository';

export interface ISosLogRepository extends IBaseRepository<SosLog> {
  findByBookingId(bookingId: string): Promise<SosLog | null>;
  findByRideId(rideId: string): Promise<SosLog | null>;
  findByRiderAndRideId(rideId: string, riderId: string): Promise<SosLog | null>;
  findAll(): Promise<SosLog[]>;
  findAllFiltered(
    skip: number,
    limit: number,
    filter?: { status?: string; userIds?: string[]; sort?: 'newest' | 'oldest' }
  ): Promise<SosLog[]>;
  countDocumentsFiltered(filter?: { status?: string; userIds?: string[] }): Promise<number>;
}
