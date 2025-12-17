import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriptionPlanDocument extends Document {
  _id: mongoose.Types.ObjectId;
  tier: string;
  description: string;
  features: {
    maxJoinRequestsPerRide: number | null;
    maxRideAcceptancesPerMonth: number | null;
    platformFeePercentage: number;
    verificationBadge: boolean;
    priorityInList: boolean;
    customCostSharing: boolean;
  };
  price: {
    monthly: number;
    yearly: number;
  };
  stripeId: {
    monthly: string;
    yearly: string;
  };
  isActive: boolean;
  isDefault: boolean;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionPlanSchema = new Schema<ISubscriptionPlanDocument>(
  {
    tier: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    description: { type: String, required: true, trim: true },
    features: {
      maxJoinRequestsPerRide: { type: Number, default: null },
      maxRideAcceptancesPerMonth: { type: Number, default: null },
      platformFeePercentage: { type: Number, required: true },
      verificationBadge: { type: Boolean, required: true },
      priorityInList: { type: Boolean, required: true },
      customCostSharing: { type: Boolean, required: true },
    },
    price: {
      monthly: { type: Number, required: true },
      yearly: { type: Number, required: true },
    },
    stripeId: {
      monthly: { type: String, required: true },
      yearly: { type: String, required: true },
    },
    isActive: { type: Boolean, default: true, index: true },
    isPopular: { type: Boolean, default: false },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

SubscriptionPlanSchema.index({ tier: 1 }, { unique: true });
SubscriptionPlanSchema.index({ 'stripeId.monthly': 1 }, { unique: true });
SubscriptionPlanSchema.index({ 'stripeId.yearly': 1 }, { unique: true });

export const SubscriptionPlanModel = mongoose.model<ISubscriptionPlanDocument>(
  'SubscriptionPlan',
  SubscriptionPlanSchema
);
