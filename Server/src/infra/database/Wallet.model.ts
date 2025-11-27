import mongoose, { Schema, Document } from 'mongoose';

export interface IWalletDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  balance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const WalletSchema = new Schema<IWalletDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
  },
  { timestamps: true }
);

export const WalletModel = mongoose.model<IWalletDocument>(
  'Wallet',
  WalletSchema
);
