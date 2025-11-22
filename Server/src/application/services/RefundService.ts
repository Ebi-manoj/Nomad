import { RefundServiceResDTO } from '../../domain/dto/RideBookingDTO';
import { RideBooking } from '../../domain/entities/RideBooking';
import { IRefundService } from './IRefundService';

export class RefundService implements IRefundService {
  private readonly THRESHOLD_DISTANCE = 5;
  private readonly THRESHOLD_DURATION = 10;
  async execute(booking: RideBooking): Promise<RefundServiceResDTO> {}
}
