import { Types } from 'mongoose';
import { ChatMessage } from '../../domain/entities/ChatMessage';
import type { IChatMessageDocument } from '../database/chatMessage.model';
import type { IMapper } from './IMapper';

export const chatMessageMapper: IMapper<ChatMessage, IChatMessageDocument> = {
  toPersistence(domain: ChatMessage): Partial<IChatMessageDocument> {
    return {
      roomId: domain.getRoomId(),
      senderId: new Types.ObjectId(domain.getSenderId()),
      senderRole: domain.getSenderRole(),
      message: domain.getMessage(),
    };
  },

  toDomain(doc: IChatMessageDocument): ChatMessage {
    return new ChatMessage({
      id: doc._id?.toString(),
      roomId: doc.roomId,
      senderId: doc.senderId.toString(),
      senderRole: doc.senderRole,
      message: doc.message,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  },
};
