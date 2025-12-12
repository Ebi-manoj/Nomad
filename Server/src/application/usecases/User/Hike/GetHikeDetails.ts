import {
  GetHikeDetailsReqDTO,
  GetHikeDetailsResponseDTO,
} from '../../../../domain/dto/HikeDTO';
import { Forbidden } from '../../../../domain/errors/CustomError';
import { HikeNotFound } from '../../../../domain/errors/HikeErrors';
import { HikeDetailsMapper } from '../../../mappers/HikeMapper';
import { IHikeRepository } from '../../../repositories/IHikeRepository';
import { IPaymentRepository } from '../../../repositories/IPaymentRepository';
import { IReviewRepository } from '../../../repositories/IReviewRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { ISubscriptionService } from '../../../services/ISubscriptionService';
import { IGetHikeDetailsUseCase } from './IGetHikeDetails';

export class GetHikeDetailsUseCase implements IGetHikeDetailsUseCase {
  constructor(
    private readonly _hikeRepository: IHikeRepository,
    private readonly _bookingRepository: IRideBookingRepository,
    private readonly _paymentRepository: IPaymentRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _reviewRepository: IReviewRepository,
    private readonly _subscriptionService: ISubscriptionService
  ) {}
  async execute(
    data: GetHikeDetailsReqDTO
  ): Promise<GetHikeDetailsResponseDTO> {
    const hike = await this._hikeRepository.findById(data.hikeId);
    if (!hike) throw new HikeNotFound();

    if (hike.getUserId() !== data.userId) throw new Forbidden();

    let booking = null;
    const bookingId = hike.getBookingId();
    if (bookingId) {
      booking = await this._bookingRepository.findById(bookingId);
    }

    let payment = null;
    if (booking) {
      payment = await this._paymentRepository.findById(booking.getPaymentId());
    }

    let rider = null;
    let subscriptionTier = undefined;
    const riderId = hike.getRiderId();
    if (riderId) {
      rider = await this._userRepository.findById(riderId);
      const sub = await this._subscriptionService.getActiveSubscription(
        riderId
      );
      subscriptionTier = sub.tier;
    }

    let review = null;
    if (booking) {
      review = await this._reviewRepository.findByReviewerAndBooking(
        data.userId,
        booking.getId()!
      );
    }

    return HikeDetailsMapper(
      hike,
      payment,
      booking,
      rider,
      review,
      subscriptionTier
    );
  }
}
