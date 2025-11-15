export type ChatSenderRole = 'rider' | 'hiker';

export interface ChatMessageProps {
  id?: string;
  roomId: string;
  senderId: string;
  senderRole: ChatSenderRole;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ChatMessage {
  private id?: string;
  private roomId: string;
  private senderId: string;
  private senderRole: ChatSenderRole;
  private message: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: ChatMessageProps) {
    this.id = props.id;
    this.roomId = props.roomId;
    this.senderId = props.senderId;
    this.senderRole = props.senderRole;
    this.message = props.message;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  getId(): string | undefined {
    return this.id;
  }

  getRoomId(): string {
    return this.roomId;
  }

  getSenderId(): string {
    return this.senderId;
  }

  getSenderRole(): ChatSenderRole {
    return this.senderRole;
  }

  getMessage(): string {
    return this.message;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
