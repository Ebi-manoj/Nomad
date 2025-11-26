import { SosLog } from '../../domain/entities/SosLog';
import { IBaseRepository } from './IBaseRepository';

export interface ISosLogRepository extends IBaseRepository<SosLog> {
  findByBookingId(bookingId: string): Promise<SosLog[]>;
}
