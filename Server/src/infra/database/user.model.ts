import mongoose, { Schema } from 'mongoose';

export interface IUserModel {
  _id: string;
  fullName: string;
  email: string;
  mobile?: string;
  password?: string;
  role: string;
  aadhaarVerified: boolean;
  licenceVerified: boolean;
  rating: number;
  payoutContactId?: string;
  ratingCount: number;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserModel>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    aadhaarVerified: {
      type: Boolean,
      default: false,
    },
    licenceVerified: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    payoutContactId: {
      type: String,
      default: null,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', userSchema);
