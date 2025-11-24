import { Schema, model, Types, Document } from 'mongoose';
import { ReviewType } from '../../domain/enums/Reviews';

export interface IReviewDocument extends Document {
  reviewerId: Types.ObjectId;
  reviewedUserId: Types.ObjectId;
  bookingId: Types.ObjectId;
  rating: number;
  reviewText: string;
  type: ReviewType;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReviewDocument>(
  {
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    reviewedUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'RideBooking',
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewText: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: Object.values(ReviewType),
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ reviewerId: 1, bookingId: 1 }, { unique: true });

export const ReviewModel = model<IReviewDocument>('Review', ReviewSchema);
