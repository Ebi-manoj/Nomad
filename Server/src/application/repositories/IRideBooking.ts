import { RideBooking } from '../../domain/entities/RideBooking';
import { IBaseRepository } from './IBaseRepository';

export interface IRideBookingRepository extends IBaseRepository<RideBooking> {}
