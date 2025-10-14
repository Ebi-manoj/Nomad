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
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', userSchema);
