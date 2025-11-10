import { RideBooking } from '../../../../domain/entities/RideBooking';
import { RideBookingStatus } from '../../../../domain/enums/RideBooking';
import { HikeNotFound } from '../../../../domain/errors/HikeErrors';
import { JoinRequestNotFound } from '../../../../domain/errors/JoinRequestError';
import {
  PaymentInfoNotFound,
  PaymentNotSuccessfull,
} from '../../../../domain/errors/PaymentError';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IJoinRequestRepository } from '../../../repositories/IJoinRequestsRepository';
import { IPaymentRepository } from '../../../repositories/IPaymentRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { IPaymentService } from '../../../services/IPaymentService';
import { IConfirmHikerPayment } from './IConfirmHikerPayment';

export class ConfirmHikerPaymentUseCase implements IConfirmHikerPayment {
  constructor(
    private readonly paymentService: IPaymentService,
    private readonly paymentRepository: IPaymentRepository,
    private readonly rideRepository: IRideRepository,
    private readonly joinRequestRepository: IJoinRequestRepository,
    private readonly hikeRepository: IHikeRepository,
    private readonly ridebookingRepository: IRideBookingRepository
  ) {}

  async execute(paymentIntentId: string): Promise<RideBooking> {
    const payment = await this.paymentRepository.findByStripeId(
      paymentIntentId
    );
    if (!payment) throw new PaymentInfoNotFound();

    const paymentIntent = await this.paymentService.retrievePaymentIntent(
      paymentIntentId
    );
    if (paymentIntent.status !== 'succeeded') throw new PaymentNotSuccessfull();
    console.log(payment);

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
      pickupLocation: joinRequest.getPickupLocation(),
      dropoffLocation: joinRequest.getDropoffLocation(),
      status: RideBookingStatus.CONFIRMED,
    });

    const savedBooking = await this.ridebookingRepository.create(rideBooking);
    joinRequest.confirm();
    hike.setBookingId(savedBooking.getId()!);
    hike.toggleConfirmed();

    await Promise.all([
      this.hikeRepository.update(hike.getHikeId(), hike),
      this.joinRequestRepository.update(joinRequest.getId(), joinRequest),
    ]);

    return savedBooking;
  }
}
