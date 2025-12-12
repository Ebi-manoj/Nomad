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
  private _id?: string;
  private _roomId: string;
  private _senderId: string;
  private _senderRole: ChatSenderRole;
  private _message: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: ChatMessageProps) {
    this._id = props.id;
    this._roomId = props.roomId;
    this._senderId = props.senderId;
    this._senderRole = props.senderRole;
    this._message = props.message;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  getId(): string | undefined {
    return this._id;
  }

  getRoomId(): string {
    return this._roomId;
  }

  getSenderId(): string {
    return this._senderId;
  }

  getSenderRole(): ChatSenderRole {
    return this._senderRole;
  }

  getMessage(): string {
    return this._message;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }
}
