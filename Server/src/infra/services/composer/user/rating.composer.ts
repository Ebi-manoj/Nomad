import { RateUserUseCase } from '../../../../application/usecases/User/Ratings/RateUserUseCase';
import { IReviewController } from '../../../../interfaces/http/controllers/IReviewController';
import { ReviewController } from '../../../../interfaces/http/controllers/review.controller';
import { RideBookingRepository } from '../../../repositories/RideBookingRepository';
import { ReviewRepository } from '../../../repositories/ReviewRepository';
import { MongoUserRepository } from '../../../repositories/UserRepository';

export function ratingComposer(): IReviewController {
  const bookingRepository = new RideBookingRepository();
  const reviewRepository = new ReviewRepository();
  const userRepository = new MongoUserRepository();

  const rateUserUseCase = new RateUserUseCase(
    bookingRepository,
    reviewRepository,
    userRepository
  );

  return new ReviewController(rateUserUseCase);
}
