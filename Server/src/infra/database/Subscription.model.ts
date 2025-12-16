import mongoose, { Schema, Document } from 'mongoose';
import {
  BillingCycle,
  SubscriptionStatus,
  SubscriptionTier,
} from '../../domain/enums/subscription';

export interface ISubscriptionDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  planId: mongoose.Types.ObjectId;
  tier: string;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  price: number;
  currency: string;
  features: {
    maxJoinRequestsPerRide: number | null;
    maxRideAcceptancesPerMonth: number | null;
    platformFeePercentage: number;
    verificationBadge: boolean;
    priorityInList: boolean;
    customCostSharing: boolean;
  };
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
    planId: {
      type: Schema.Types.ObjectId,
      ref: 'SubscriptionPlan',
      required: true,
      index: true,
    },
    tier: {
      type: String,
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
    features: {
      maxJoinRequestsPerRide: { type: Number, default: null },
      maxRideAcceptancesPerMonth: { type: Number, default: null },
      platformFeePercentage: { type: Number, default: 0 },
      verificationBadge: { type: Boolean, default: false },
      priorityInList: { type: Boolean, default: false },
      customCostSharing: { type: Boolean, default: false },
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
