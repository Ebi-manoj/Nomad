import { ConfirmHikerPaymentDTO } from '../../../../domain/dto/paymentDTO';
import { RideBooking } from '../../../../domain/entities/RideBooking';
import { RideBookingStatus } from '../../../../domain/enums/RideBooking';
import { HikeNotFound } from '../../../../domain/errors/HikeErrors';
import { JoinRequestNotFound } from '../../../../domain/errors/JoinRequestError';
import {
  PaymentInfoNotFound,
  PaymentNotSuccessfull,
} from '../../../../domain/errors/PaymentError';
import {
  RideLocationNotFound,
  RideNotFound,
} from '../../../../domain/errors/RideErrors';
import { IRealtimeGateway } from '../../../providers/IRealtimeGateway';
import { ITransactionManager } from '../../../providers/ITransactionManager';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IJoinRequestRepository } from '../../../repositories/IJoinRequestsRepository';
import { ILocationRepository } from '../../../repositories/ILocationRepository';
import { IPaymentRepository } from '../../../repositories/IPaymentRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IPaymentService } from '../../../services/IPaymentService';
import { ICreateTasksUseCase } from '../Task/ICreateTaskUseCase';
import { IConfirmHikerPayment } from './IConfirmHikerPayment';

export class ConfirmHikerPaymentUseCase implements IConfirmHikerPayment {
  constructor(
    private readonly paymentService: IPaymentService,
    private readonly paymentRepository: IPaymentRepository,
    private readonly rideRepository: IRideRepository,
    private readonly joinRequestRepository: IJoinRequestRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly ridebookingRepository: IRideBookingRepository,
    private readonly transactionManager: ITransactionManager,
    private readonly createTasksUseCase: ICreateTasksUseCase,
    private readonly realtimeGateWay: IRealtimeGateway,
    private readonly locationRepository: ILocationRepository
  ) {}

  async execute(paymentIntentId: string): Promise<ConfirmHikerPaymentDTO> {
    const { booking, shouldCreateTasks } =
      await this.transactionManager.runInTransaction(async () => {
        const payment = await this.paymentRepository.findByStripeId(
          paymentIntentId
        );
        if (!payment) throw new PaymentInfoNotFound();

        const paymentIntent = await this.paymentService.retrievePaymentIntent(
          paymentIntentId
        );
        if (paymentIntent.status !== 'succeeded')
          throw new PaymentNotSuccessfull();

        payment.success();
        await this.paymentRepository.update(payment.getId()!, payment);

        const [ride, hike, joinRequest] = await Promise.all([
          this.rideRepository.findById(payment.getRideId()),
          this.hikeRepository.findById(payment.getHikeId()),
          this.joinRequestRepository.findById(payment.getJoinRequestId()),
        ]);
        if (!ride) throw new RideNotFound();
        if (!hike) throw new HikeNotFound();
        if (!joinRequest) throw new JoinRequestNotFound();

        const existingBooking =
          await this.ridebookingRepository.findbyPaymentId(payment.getId()!);
        if (existingBooking) {
          return { booking: existingBooking, shouldCreateTasks: false };
        }

        const riderLocation = await this.locationRepository.getLocation(
          ride.getRideId()!
        );
        if (!riderLocation) throw new RideLocationNotFound();

        const riderGeo: GeoJSON.Point = {
          type: 'Point',
          coordinates: [riderLocation.lng, riderLocation.lat],
        };

        const rideBooking = new RideBooking({
          rideId: ride.getRideId()!,
          hikeId: hike.getHikeId()!,
          riderId: ride.getRiderId(),
          hikerId: hike.getUserId()!,
          joinRequestId: joinRequest.getId()!,
          paymentId: payment.getId()!,
          seatsBooked: joinRequest.getSeatsRequested()!,
          amount: payment.getAmount(),
          platformFee: payment.getPlatformFee(),
          riderInitialLocation: riderGeo,
          pickupLocation: joinRequest.getPickupLocation(),
          dropoffLocation: joinRequest.getDropoffLocation(),
          status: RideBookingStatus.CONFIRMED,
        });

        const savedBooking = await this.ridebookingRepository.create(
          rideBooking
        );
        joinRequest.confirm();
        hike.setBookingId(savedBooking.getId()!);
        hike.assignRider(ride.getRiderId());
        hike.toggleConfirmed();

        await Promise.all([
          this.hikeRepository.update(hike.getHikeId(), hike),
          this.joinRequestRepository.update(joinRequest.getId(), joinRequest),
          this.rideRepository.update(ride.getRideId(), ride),
        ]);

        return { booking: savedBooking, shouldCreateTasks: true };
      });

    if (shouldCreateTasks) {
      await this.createTasksUseCase.execute(booking);
    }

    await this.realtimeGateWay.emitToRoom(
      'rider',
      booking.getRideId(),
      'hike:confirmed',
      {
        message: 'New Hike confirmed successfully',
        bookingId: booking.getId()!,
        seatsBooked: booking.getSeatsBooked(),
        amount: booking.getCostShared(),
      }
    );

    const response: ConfirmHikerPaymentDTO = {
      bookingId: booking.getId()!,
      paymentId: booking.getPaymentId(),
      seatsBooked: booking.getSeatsBooked(),
      amount: booking.getAmount(),
      platformFee: booking.getPlatformFee(),
    };
    return response;
  }
}
