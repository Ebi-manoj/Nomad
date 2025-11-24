import { ReviewType } from '../enums/Reviews';

export interface ReviewProps {
  id?: string;
  reviewerId: string;
  reviewedUserId: string;
  bookingId: string;
  rating: number;
  reviewText: string;
  type: ReviewType;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Review {
  private readonly id?: string;
  private readonly reviewerId: string;
  private readonly reviewedUserId: string;
  private readonly bookingId: string;
  private readonly rating: number;
  private readonly reviewText: string;
  private readonly type: ReviewType;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: ReviewProps) {
    this.id = props.id;
    this.reviewerId = props.reviewerId;
    this.reviewedUserId = props.reviewedUserId;
    this.bookingId = props.bookingId;
    this.rating = props.rating;
    this.reviewText = props.reviewText;
    this.type = props.type;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  getId() {
    return this.id;
  }

  getReviewerId() {
    return this.reviewerId;
  }

  getReviewedUserId() {
    return this.reviewedUserId;
  }
  getBookingId() {
    return this.bookingId;
  }

  getRating() {
    return this.rating;
  }
  getReviewText() {
    return this.reviewText;
  }
  getType() {
    return this.type;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  getUpdatedAt() {
    return this.updatedAt;
  }
}
