import {
  CancelRideBookingReqDTO,
  CancelRideBookingResDTO,
} from '../../../../domain/dto/RideBookingDTO';
import { RideBookingStatus } from '../../../../domain/enums/RideBooking';
import { HikeStatus } from '../../../../domain/enums/Hike';
import { TaskStatus } from '../../../../domain/enums/Task';
import { Forbidden, UpdateFailed } from '../../../../domain/errors/CustomError';
import { HikeNotFound } from '../../../../domain/errors/HikeErrors';
import { RideBookingNotFound } from '../../../../domain/errors/RideBookingError';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { ITransactionManager } from '../../../providers/ITransactionManager';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { ITaskRepository } from '../../../repositories/ITaskRepository';
import { ICancelRideBookingUseCase } from './ICancelRideBookingUseCase';
import { IRefundService } from '../../../services/IRefundService';
import { ICreateNotificationUseCase } from '../Notification/ICreateNotificationUseCase';
import { IBookingCancelRefundService } from '../../../services/IBookingCancelRefundService';

export class CancelRideBookingUseCase implements ICancelRideBookingUseCase {
  constructor(
    private readonly _bookingRepository: IRideBookingRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _hikeRepository: IHikeRepository,
    private readonly _taskRepository: ITaskRepository,
    private readonly _refundService: IRefundService,
    private readonly _transactionManager: ITransactionManager,
    private readonly _bookingCancelRefundService: IBookingCancelRefundService,
    private readonly _createNotification: ICreateNotificationUseCase
  ) {}

  async execute(
    data: CancelRideBookingReqDTO
  ): Promise<CancelRideBookingResDTO> {
    const { booking, refundAmount, distance, duration } =
      await this._transactionManager.runInTransaction(async () => {
        const booking = await this._bookingRepository.findById(data.bookingId);
        if (!booking) throw new RideBookingNotFound();

        if (booking.getHikerId() !== data.userId) throw new Forbidden();

        if (booking.getStatus() !== RideBookingStatus.CONFIRMED) {
          throw new Forbidden('Cannot cancel booking at this stage');
        }

        const hike = await this._hikeRepository.findById(booking.getHikeId());
        if (!hike) throw new HikeNotFound();

        const ride = await this._rideRepository.findById(booking.getRideId());
        if (!ride) throw new RideNotFound();

        const tasks = await this._taskRepository.findByRideBookingId(
          booking.getId()!
        );

        const { refundAmount, distance, duration } =
          await this._refundService.execute(booking);

        booking.cancel();
        booking.setRefundedAmount(refundAmount);

        hike.updateStatus(HikeStatus.CANCELLED);

        ride.releaseSeats(booking.getSeatsBooked());

        for (const task of tasks) {
          if (task.getStatus() === TaskStatus.PENDING) {
            task.cancel();
            await this._taskRepository.update(task.getId()!, task);
          }
        }

        const [updatedBooking, updatedHike, updatedRide] = await Promise.all([
          this._bookingRepository.update(booking.getId()!, booking),
          this._hikeRepository.update(hike.getHikeId(), hike),
          this._rideRepository.update(ride.getRideId()!, ride),
        ]);

        if (!updatedBooking || !updatedHike || !updatedRide)
          throw new UpdateFailed();

        return { booking: updatedBooking, refundAmount, distance, duration };
      });

   
    await this._bookingCancelRefundService.execute(booking, refundAmount);

    await this._createNotification.execute({
      userId: booking.getRiderId(),
      type: 'booking_cancelled',
      title: 'Booking cancelled',
      message: 'The hiker cancelled the booking',
      data: {
        bookingId: booking.getId()!,
        rideId: booking.getRideId(),
        hikeId: booking.getHikeId(),
        refundAmount,
      },
    });

    return {
      bookingId: booking.getId()!,
      status: booking.getStatus(),
      refundAmount,
      distanceToRider: distance,
      etaMinutes: duration,
    };
  }
}
