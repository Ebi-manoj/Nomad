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
  private readonly _id?: string;
  private readonly _reviewerId: string;
  private readonly _reviewedUserId: string;
  private readonly _bookingId: string;
  private readonly _rating: number;
  private readonly _reviewText: string;
  private readonly _type: ReviewType;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: ReviewProps) {
    this._id = props.id;
    this._reviewerId = props.reviewerId;
    this._reviewedUserId = props.reviewedUserId;
    this._bookingId = props.bookingId;
    this._rating = props.rating;
    this._reviewText = props.reviewText;
    this._type = props.type;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  getId() {
    return this._id;
  }

  getReviewerId() {
    return this._reviewerId;
  }

  getReviewedUserId() {
    return this._reviewedUserId;
  }
  getBookingId() {
    return this._bookingId;
  }

  getRating() {
    return this._rating;
  }
  getReviewText() {
    return this._reviewText;
  }
  getType() {
    return this._type;
  }
  getCreatedAt() {
    return this._createdAt;
  }
  getUpdatedAt() {
    return this._updatedAt;
  }
}
