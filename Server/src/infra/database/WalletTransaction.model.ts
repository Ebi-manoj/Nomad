import mongoose, { Schema, Document } from 'mongoose';
import {
  TransactionReferenceType,
  WalletTransactionType,
  WalletTransactionStatus,
} from '../../domain/enums/Wallet';

export interface IWalletTransactionDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  referenceType: TransactionReferenceType;
  referenceId: string;
  amount: number;
  type: WalletTransactionType;
  description: string;
  status: WalletTransactionStatus;
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
    referenceType: {
      type: String,
      enum: Object.values(TransactionReferenceType),
      index: true,
    },
    referenceId: {
      type: String,
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
    status: {
      type: String,
      enum: Object.values(WalletTransactionStatus),
      default: WalletTransactionStatus.PROCESSING,
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
