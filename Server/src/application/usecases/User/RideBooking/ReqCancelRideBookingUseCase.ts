import {
  ReqCancelBookingReqDTO,
  ReqCancelBookingResDTO,
} from '../../../../domain/dto/RideBookingDTO';
import { Forbidden } from '../../../../domain/errors/CustomError';
import { RideBookingNotFound } from '../../../../domain/errors/RideBookingError';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRefundService } from '../../../services/IRefundService';
import { IReqCancelRideBookingUseCase } from './IReqCancelRideBookingUseCase';

export class ReqCancelRideBookingUseCase
  implements IReqCancelRideBookingUseCase
{
  constructor(
    private readonly _bookingRepository: IRideBookingRepository,
    private readonly _refundService: IRefundService
  ) {}
  async execute(data: ReqCancelBookingReqDTO): Promise<ReqCancelBookingResDTO> {
    const booking = await this._bookingRepository.findById(data.bookingId);
    if (!booking) throw new RideBookingNotFound();

    if (booking.getHikerId() !== data.userId) throw new Forbidden();

    const { refundAmount, distance, duration, isRiderDelay } =
      await this._refundService.execute(booking);

    return {
      bookingId: booking.getId()!,
      refundAmount,
      distanceRiderAway: distance,
      durationToPickup: duration,
      isRiderDelay,
    };
  }
}
