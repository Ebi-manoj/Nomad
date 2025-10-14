import mongoose, { Schema, Types } from 'mongoose';
import { Documents, DocumentStatus } from '../../domain/enums/documentStatus';

export interface IDocumentModel {
  _id: string;
  user_id: Types.ObjectId;
  document_type: Documents.Aadhaar | Documents.Licence;
  document_number: string;
  verified: boolean;
  status: DocumentStatus;
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
      enum: [Documents.Aadhaar, Documents.Licence],
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
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.Pending,
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
