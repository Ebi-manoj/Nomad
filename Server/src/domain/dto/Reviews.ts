import { ReviewType } from '../enums/Reviews';

export interface RateUserReqDTO {
  userId: string;
  reviewedUserId: string;
  rating: number;
  reviewText: string;
  bookingId: string;
  type: ReviewType;
}

export interface RateUserResDTO {
  message: string;
  bookingId: string;
  reviewedUserId: string;
}

export interface ReviewResponseDTO {
  reviewId: string;
  reviewerId: string;
  reviewedUserId: string;
  rating: number;
  reviewText: string;
  bookingId: string;
  type: ReviewType;
  createdAt: Date;
}
