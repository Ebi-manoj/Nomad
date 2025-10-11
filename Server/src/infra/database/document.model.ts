import mongoose, { Schema, Types } from 'mongoose';

export interface IDocumentModel {
  _id: string;
  user_id: Types.ObjectId;
  document_type: 'aadhaar' | 'license';
  document_number: string;
  verified: boolean;
  status: 'pending' | 'verified' | 'rejected';
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema<IDocumentModel>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    document_type: {
      type: String,
      enum: ['aadhaar', 'license'],
      required: true,
    },
    document_number: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const DocumentModel = mongoose.model<IDocumentModel>(
  'Document',
  documentSchema
);
