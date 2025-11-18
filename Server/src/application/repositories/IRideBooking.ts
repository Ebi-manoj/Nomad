import { RideBooking } from '../../domain/entities/RideBooking';
import { IBaseRepository } from './IBaseRepository';

export interface IRideBookingRepository extends IBaseRepository<RideBooking> {
  findbyPaymentId(id: string): Promise<RideBooking | null>;
  findByRideId(id: string): Promise<RideBooking[]>;
  findByHikeId(id: string): Promise<RideBooking | null>;
}
