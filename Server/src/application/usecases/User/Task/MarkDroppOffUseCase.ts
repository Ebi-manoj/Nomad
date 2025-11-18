import {
  MarkDroppOffReqDTO,
  MarkDroppOffResDTO,
} from '../../../../domain/dto/TaskDTO';
import { Forbidden, UpdateFailed } from '../../../../domain/errors/CustomError';
import { HikeNotFound } from '../../../../domain/errors/HikeErrors';
import { RideBookingNotFound } from '../../../../domain/errors/RideBookingError';
import { ITransactionManager } from '../../../providers/ITransactionManager';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IMarkDropOffUseCase } from './IMarkDropOffUseCase';

export class MarkDropOffUseCase implements IMarkDropOffUseCase {
  constructor(
    private readonly bookingRepository: IRideBookingRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(data: MarkDroppOffReqDTO): Promise<MarkDroppOffResDTO> {
    const booking = await this.transactionManager.runInTransaction(async () => {
      const booking = await this.bookingRepository.findById(data.bookingId);
      if (!booking) throw new RideBookingNotFound();

      if (booking.getHikerId() !== data.userId) throw new Forbidden();
      const hike = await this.hikeRepository.findById(booking.getHikeId());
      if (!hike) throw new HikeNotFound();

      booking.markDroppedOff();
      hike.complete();
      const [updatedHike, updatedBooking] = await Promise.all([
        this.hikeRepository.update(hike.getHikeId(), hike),
        this.bookingRepository.update(booking.getId(), booking),
      ]);
      if (!updatedBooking || !updatedHike) throw new UpdateFailed();
      return updatedBooking;
    });
    return {
      bookingId: booking.getId()!,
      message: 'Hike Completed Successfully',
    };
  }
}
