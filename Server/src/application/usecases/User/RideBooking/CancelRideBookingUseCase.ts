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
import {
  RideNotFound,
} from '../../../../domain/errors/RideErrors';
import { ITransactionManager } from '../../../providers/ITransactionManager';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { ITaskRepository } from '../../../repositories/ITaskRepository';
import { ICancelRideBookingUseCase } from './ICancelRideBookingUseCase';
import { IRefundService } from '../../../services/IRefundService';

export class CancelRideBookingUseCase implements ICancelRideBookingUseCase {
  constructor(
    private readonly bookingRepository: IRideBookingRepository,
    private readonly rideRepository: IRideRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly taskRepository: ITaskRepository,
    private readonly refundService: IRefundService,
    private readonly transactionManager: ITransactionManager
  ) {}

  async execute(
    data: CancelRideBookingReqDTO
  ): Promise<CancelRideBookingResDTO> {
    const { booking, refundAmount, distance, duration } =
      await this.transactionManager.runInTransaction(async () => {
        const booking = await this.bookingRepository.findById(data.bookingId);
        if (!booking) throw new RideBookingNotFound();

        if (booking.getHikerId() !== data.userId) throw new Forbidden();

        if (booking.getStatus() !== RideBookingStatus.CONFIRMED) {
          throw new Forbidden('Cannot cancel booking at this stage');
        }

        const hike = await this.hikeRepository.findById(booking.getHikeId());
        if (!hike) throw new HikeNotFound();

        const ride = await this.rideRepository.findById(booking.getRideId());
        if (!ride) throw new RideNotFound();

        const tasks = await this.taskRepository.findByRideBookingId(
          booking.getId()!
        );

        const { refundAmount, distance, duration } =
          await this.refundService.execute(booking);

        booking.cancel();
        booking.setRefundedAmount(refundAmount);

        hike.updateStatus(HikeStatus.CANCELLED);

        ride.releaseSeats(booking.getSeatsBooked());

        for (const task of tasks) {
          if (task.getStatus() === TaskStatus.PENDING) {
            task.cancel();
            await this.taskRepository.update(task.getId()!, task);
          }
        }

        const [updatedBooking, updatedHike, updatedRide] = await Promise.all([
          this.bookingRepository.update(booking.getId()!, booking),
          this.hikeRepository.update(hike.getHikeId(), hike),
          this.rideRepository.update(ride.getRideId()!, ride),
        ]);

        if (!updatedBooking || !updatedHike || !updatedRide)
          throw new UpdateFailed();

        return { booking: updatedBooking, refundAmount, distance, duration };
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
