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
import { RideLocationNotFound, RideNotFound } from '../../../../domain/errors/RideErrors';
import { IGoogleApi } from '../../../providers/IGoogleApi';
import { ITransactionManager } from '../../../providers/ITransactionManager';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { ILocationRepository } from '../../../repositories/ILocationRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { ITaskRepository } from '../../../repositories/ITaskRepository';
import { ICancelRideBookingUseCase } from './ICancelRideBookingUseCase';

export class CancelRideBookingUseCase implements ICancelRideBookingUseCase {
  constructor(
    private readonly bookingRepository: IRideBookingRepository,
    private readonly rideRepository: IRideRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly taskRepository: ITaskRepository,
    private readonly locationRepository: ILocationRepository,
    private readonly googleApi: IGoogleApi,
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

        let distance = 0;
        let duration = 0;

        const riderLocation = await this.locationRepository.getLocation(
          booking.getRideId()
        );

        if (!riderLocation) {
          throw new RideLocationNotFound();
        }

        const riderCoord = { lat: riderLocation.lat, lng: riderLocation.lng };
        const pickupCoord = {
          lat: booking.getPickupLocation().coordinates[1],
          lng: booking.getPickupLocation().coordinates[0],
        };

        const distanceResult = await this.googleApi.getDistance(
          riderCoord,
          pickupCoord
        );

        distance = distanceResult.distance;
        duration = distanceResult.duration;

        const isFarInDistance = distance >= 5;
        const isFarInTime = duration >= 10;

        const eligibleFor50 = isFarInDistance && isFarInTime;
        const refundPercent = eligibleFor50 ? 0.5 : 0;

        const refundAmount = booking.getAmount() * refundPercent;

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
