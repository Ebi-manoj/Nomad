import {
  RateUserReqDTO,
  ReviewResponseDTO,
} from '../../../../domain/dto/Reviews';
import { Review } from '../../../../domain/entities/Reviews';
import { ReviewType } from '../../../../domain/enums/Reviews';
import { Forbidden } from '../../../../domain/errors/CustomError';
import { AlreadyReviewed } from '../../../../domain/errors/Reviews';
import { RideBookingNotFound } from '../../../../domain/errors/RideBookingError';
import { ReviewMapper } from '../../../mappers/ReviewMapper';
import { IReviewRepository } from '../../../repositories/IReviewRepository';
import { IRideBookingRepository } from '../../../repositories/IRideBooking';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { IRateUserUseCase } from './IRateUserUseCase';

export class RateUserUseCase implements IRateUserUseCase {
  constructor(
    private readonly bookingRepository: IRideBookingRepository,
    private readonly reviewRepository: IReviewRepository,
    private readonly userRepository: IUserRepository
  ) {}
  async execute(data: RateUserReqDTO): Promise<ReviewResponseDTO> {
    const booking = await this.bookingRepository.findById(data.bookingId);
    if (!booking) throw new RideBookingNotFound();
    if (
      booking.getStatus() !== 'COMPLETED' &&
      booking.getStatus() !== 'CANCELLED' &&
      booking.getStatus() !== 'DROPPED OFF'
    ) {
      throw new Forbidden('Cannot review before the ride/hike is completed');
    }

    if (data.type == ReviewType.HIKER_TO_RIDER) {
      if (booking.getHikerId() !== data.userId) throw new Forbidden();
      if (booking.getRiderId() !== data.reviewedUserId)
        throw new Forbidden('Invalid RiderId for this booking');
    }

    if (data.type == ReviewType.RIDER_TO_HIKER) {
      if (booking.getRiderId() !== data.userId) throw new Forbidden();
      if (booking.getHikerId() !== data.reviewedUserId)
        throw new Forbidden('Invalid HikerId for this booking');
    }

    const isExisiting = await this.reviewRepository.findByReviewerAndBooking(
      data.userId,
      booking.getId()!
    );
    if (isExisiting) throw new AlreadyReviewed();

    const review = new Review({
      ...data,
      reviewerId: data.userId,
    });

    const savedReview = await this.reviewRepository.create(review);

    const user = await this.userRepository.findById(
      savedReview.getReviewedUserId()
    );
    if (user) {
      user.updateRatings(savedReview.getRating());
      await this.userRepository.update(user.getId(), user);
    }

    return ReviewMapper(savedReview);
  }
}
