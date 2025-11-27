import mongoose, { Schema, Document } from 'mongoose';
import { WalletTransactionType } from '../../domain/enums/Wallet';

export interface IWalletTransactionDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rideId?: mongoose.Types.ObjectId;
  amount: number;
  type: WalletTransactionType;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const WalletTransactionSchema = new Schema<IWalletTransactionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    rideId: {
      type: Schema.Types.ObjectId,
      ref: 'RideLog',
      required: false,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(WalletTransactionType),
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export const WalletTransactionModel =
  mongoose.model<IWalletTransactionDocument>(
    'WalletTransaction',
    WalletTransactionSchema
  );
