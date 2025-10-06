import mongoose, { Schema } from 'mongoose';

export interface IUserModel {
  _id: string;
  fullName: string;
  email: string;
  mobile?: string;
  password?: string;
  role: string;
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
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', userSchema);
