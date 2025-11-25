import { Schema, model, Types } from 'mongoose';

export interface ISosContactModel {
  _id: string;
  userId: Types.ObjectId;
  name: string;
  phone: string;
  relation?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SosContactSchema = new Schema<ISosContactModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    relation: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true }
);

SosContactSchema.index({ userId: 1, phone: 1 }, { unique: true });

export const SosContactModel = model<ISosContactModel>(
  'SosContact',
  SosContactSchema
);
