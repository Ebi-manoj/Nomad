import mongoose, { Schema, Document } from 'mongoose';
import type { PayoutMode } from '../../domain/dto/Payouts';

export type PayoutStatus =
  | 'queued'
  | 'pending'
  | 'processing'
  | 'processed'
  | 'reversed'
  | 'cancelled';

export interface IPayoutDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  transactionId: string;
  razorpayPayoutId: string;
  contactId: string;
  fundAccountId: string;
  amount: number;
  mode: PayoutMode;
  status: PayoutStatus;
  utr?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PayoutSchema = new Schema<IPayoutDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    transactionId: {
      type: String,
      index: true,
      required: true,
    },
    razorpayPayoutId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    contactId: {
      type: String,
      required: true,
      index: true,
    },
    fundAccountId: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    mode: {
      type: String,
      enum: ['IMPS', 'NEFT', 'UPI'],
      required: true,
    },
    status: {
      type: String,
      enum: [
        'queued',
        'pending',
        'processing',
        'processed',
        'reversed',
        'cancelled',
      ],
      required: true,
      index: true,
    },
    utr: {
      type: String,
    },
  },
  { timestamps: true }
);

export const PayoutModel = mongoose.model<IPayoutDocument>(
  'Payout',
  PayoutSchema
);
