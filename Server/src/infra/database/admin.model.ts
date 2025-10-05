import mongoose, { Schema } from 'mongoose';

export interface IAdminModel {
  _id: string;
  email: string;
  password: string;
}

const adminSchema = new Schema<IAdminModel>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const AdminModel = mongoose.model('admin', adminSchema);
