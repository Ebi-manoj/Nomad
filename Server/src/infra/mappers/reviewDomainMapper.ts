import { Types } from 'mongoose';
import { Review } from '../../domain/entities/Reviews';
import { IMapper } from './IMapper';
import { IReviewDocument } from '../database/review.model';

export const reviewMapper: IMapper<Review, IReviewDocument> = {
  toPersistence(domain: Review): Partial<IReviewDocument> {
    return {
      reviewerId: new Types.ObjectId(domain.getReviewerId()),
      reviewedUserId: new Types.ObjectId(domain.getReviewedUserId()),
      bookingId: new Types.ObjectId(domain.getBookingId()),
      rating: domain.getRating(),
      reviewText: domain.getReviewText(),
      type: domain.getType(),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
    };
  },

  toDomain(persistence: IReviewDocument): Review {
    return new Review({
      id: persistence._id?.toString(),
      reviewerId: persistence.reviewerId.toString(),
      reviewedUserId: persistence.reviewedUserId.toString(),
      bookingId: persistence.bookingId.toString(),
      rating: persistence.rating,
      reviewText: persistence.reviewText,
      type: persistence.type,
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
    });
  },
};
