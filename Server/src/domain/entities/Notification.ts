import { NotificationDTO } from '../dto/NotificationDTO';
import { NotificationType } from '../enums/Notification';

export interface NotificationProps {
  id?: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Notification {
  private _id?: string;
  private _userId: string;
  private _type: NotificationType;
  private _title: string;
  private _message: string;
  private _data?: Record<string, unknown>;
  private _read: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: NotificationProps) {
    this._id = props.id;
    this._userId = props.userId;
    this._type = props.type;
    this._title = props.title;
    this._message = props.message;
    this._data = props.data;
    this._read = props.read ?? false;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  getId(): string | undefined {
    return this._id;
  }

  getUserId(): string {
    return this._userId;
  }

  getType(): NotificationType {
    return this._type;
  }

  getTitle(): string {
    return this._title;
  }

  getMessage(): string {
    return this._message;
  }

  getData(): Record<string, unknown> | undefined {
    return this._data;
  }

  isRead(): boolean {
    return this._read;
  }

  markAsRead(): void {
    this._read = true;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  toJson(): NotificationDTO {
    return {
      id: this._id as string,
      userId: this._userId,
      type: this._type,
      title: this._title,
      message: this._message,
      data: this._data,
      read: this._read,
      createdAt: this._createdAt,
    };
  }
}
