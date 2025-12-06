import mongoose, { Schema, Document } from 'mongoose';
import {
  BillingCycle,
  SubscriptionStatus,
  SubscriptionTier,
} from '../../domain/enums/subscription';

export interface ISubscriptionDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  price: number;
  currency: string;
  stripeSubscriptionId?: string | null;
  stripeCustomerId?: string | null;
  stripePriceId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  cancelledAt?: Date | null;
}

const SubscriptionSchema = new Schema<ISubscriptionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    tier: {
      type: String,
      enum: Object.values(SubscriptionTier),
      required: true,
    },
    billingCycle: {
      type: String,
      enum: Object.values(BillingCycle),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      required: true,
      index: true,
    },
    stripeSubscriptionId: {
      type: String,
      default: null,
      index: true,
    },
    stripeCustomerId: {
      type: String,
      default: null,
      index: true,
    },
    stripePriceId: {
      type: String,
      default: null,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    autoRenew: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const SubscriptionModel = mongoose.model<ISubscriptionDocument>(
  'Subscription',
  SubscriptionSchema
);
