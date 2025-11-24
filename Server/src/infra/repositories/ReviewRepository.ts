import { MongoBaseRepository } from './BaseRepository';
import { IReviewRepository } from '../../application/repositories/IReviewRepository';
import { Review } from '../../domain/entities/Reviews';
import { IReviewDocument, ReviewModel } from '../database/review.model';
import { reviewMapper } from '../mappers/reviewDomainMapper';

export class ReviewRepository
  extends MongoBaseRepository<Review, IReviewDocument>
  implements IReviewRepository
{
  constructor() {
    super(ReviewModel, reviewMapper);
  }

  async findByReviewerAndBooking(
    userId: string,
    bookingId: string
  ): Promise<Review | null> {
    const review = await this.model.findOne({ reviewerId: userId, bookingId });
    return review ? this.mapper.toDomain(review) : null;
  }

  async findByReviewedUser(userId: string): Promise<Review[]> {
    const reviews = await this.model.find({ reviewedUserId: userId });
    return reviews.map(r => this.mapper.toDomain(r));
  }
}
