export const ReviewType = {
  RIDER_TO_HIKER: 'rider_to_hiker',
  HIKER_TO_RIDER: 'hiker_to_rider',
} as const;

export type typeReviewType = (typeof ReviewType)[keyof typeof ReviewType];

export interface RateUserReqDTO {
  reviewedUserId: string;
  rating: number;
  reviewText: string;
  bookingId: string;
  type: typeReviewType;
}
export interface RateUserResDTO {
  message: string;
  bookingId: string;
  reviewedUserId: string;
}
