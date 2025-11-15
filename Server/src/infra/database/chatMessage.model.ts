import mongoose, { Schema, Document } from 'mongoose';

export type ChatSenderRole = 'rider' | 'hiker';

export interface IChatMessageDocument extends Document {
  roomId: string;
  senderId: mongoose.Types.ObjectId;
  senderRole: ChatSenderRole;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ChatMessageSchema = new Schema<IChatMessageDocument>(
  {
    roomId: {
      type: String,
      required: true,
      index: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    senderRole: {
      type: String,
      enum: ['rider', 'hiker'],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const ChatMessageModel = mongoose.model<IChatMessageDocument>(
  'ChatMessage',
  ChatMessageSchema
);
