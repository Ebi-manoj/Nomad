import { RideBooking } from '../../domain/entities/RideBooking';

export interface IBookingCancelRefundService {
  execute(booking: RideBooking, refundAmount: number): Promise<void>;
}
