import { ReviewResponseDTO } from '../../domain/dto/Reviews';
import { Review } from '../../domain/entities/Reviews';

export const ReviewMapper = (data: Review): ReviewResponseDTO => {
  return {
    reviewId: data.getId()!,
    reviewerId: data.getReviewerId(),
    reviewedUserId: data.getReviewedUserId(),
    rating: data.getRating(),
    reviewText: data.getReviewText(),
    createdAt: data.getCreatedAt(),
    bookingId: data.getBookingId(),
    type: data.getType(),
  };
};
