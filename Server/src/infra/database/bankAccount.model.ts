import { Schema, model, Types } from 'mongoose';

export interface IBankAccountModel {
  _id: string;
  userId: Types.ObjectId;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountType: 'savings' | 'current';
  fundAccountId?: string | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BankAccountSchema = new Schema<IBankAccountModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    accountHolderName: { type: String, required: true, trim: true },
    accountNumber: { type: String, required: true, trim: true },
    ifscCode: { type: String, required: true, trim: true, uppercase: true },
    bankName: { type: String, required: true, trim: true },
    accountType: {
      type: String,
      required: true,
      enum: ['savings', 'current'],
      lowercase: true,
    },
    fundAccountId: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const BankAccountModel = model<IBankAccountModel>(
  'BankAccount',
  BankAccountSchema
);
