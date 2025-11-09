import mongoose, { Schema } from 'mongoose';
import { PaymentStatus } from '../../domain/enums/payment';

export interface IPaymentDocument {
  _id: string;
  joinRequestId: mongoose.Types.ObjectId;
  hikerId: mongoose.Types.ObjectId;
  riderId: mongoose.Types.ObjectId;
  hikeId: mongoose.Types.ObjectId;
  rideId: mongoose.Types.ObjectId;
  amount: number;
  platformFee: number;
  status: PaymentStatus;
  paymentMethod?: string;
  stripePaymentId?: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const PaymentSchema = new Schema<IPaymentDocument>(
  {
    joinRequestId: {
      type: Schema.Types.ObjectId,
      ref: 'JoinRequest',
      required: true,
      index: true,
    },
    hikerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    riderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hikeId: {
      type: Schema.Types.ObjectId,
      ref: 'HikeLog',
      required: true,
    },
    rideId: {
      type: Schema.Types.ObjectId,
      ref: 'RideLog',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
      index: true,
    },
    platformFee: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    stripePaymentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const PaymentModel = mongoose.model<IPaymentDocument>(
  'Payment',
  PaymentSchema
);
