import { Review } from '../../domain/entities/Reviews';
import { IBaseRepository } from './IBaseRepository';

export interface IReviewRepository extends IBaseRepository<Review> {
  findByReviewerAndBooking(
    userId: string,
    bookingId: string
  ): Promise<Review | null>;
  findByReviewedUser(userId: string): Promise<Review[]>;
}
