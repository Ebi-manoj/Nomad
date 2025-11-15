import type { ChatSenderRole } from '../entities/ChatMessage';

export interface SendChatMessageDTO {
  roomId: string;
  senderId: string;
  senderRole: ChatSenderRole;
  message: string;
}

export interface ChatMessageDTO {
  id: string;
  roomId: string;
  senderId: string;
  senderRole: ChatSenderRole;
  message: string;
  createdAt: Date;
}

export interface GetChatMessagesReqDTO {
  roomId: string;
  userId: string;
}
