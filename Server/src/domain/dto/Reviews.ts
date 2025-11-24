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
