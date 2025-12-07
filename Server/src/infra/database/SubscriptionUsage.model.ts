import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriptionUsageDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  month: string;
  joinRequestsCount: number;
  rideAcceptancesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionUsageSchema = new Schema<ISubscriptionUsageDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    month: {
      type: String,
      required: true,
    },
    joinRequestsCount: {
      type: Number,
      required: true,
      default: 0,
    },
    rideAcceptancesCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

SubscriptionUsageSchema.index(
  { userId: 1, subscriptionId: 1, month: 1 },
  { unique: true }
);

export const SubscriptionUsageModel =
  mongoose.model<ISubscriptionUsageDocument>(
    'SubscriptionUsage',
    SubscriptionUsageSchema
  );
