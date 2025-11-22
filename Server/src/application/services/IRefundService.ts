import { RefundServiceResDTO } from '../../domain/dto/RideBookingDTO';
import { RideBooking } from '../../domain/entities/RideBooking';

export interface IRefundService {
  execute(booking: RideBooking): Promise<RefundServiceResDTO>;
}
