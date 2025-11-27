import { WalletTransactionType } from '../enums/Wallet';

export interface WalletTransactionProps {
  id?: string;
  userId: string;
  rideId?: string;
  amount: number;
  type: WalletTransactionType;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}

export class WalletTransaction {
  private id?: string;
  private userId: string;
  private rideId?: string;
  private amount: number;
  private type: WalletTransactionType;
  private description: string;
  private metadata?: Record<string, unknown>;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: WalletTransactionProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.rideId = props.rideId;
    this.amount = props.amount;
    this.type = props.type;
    this.description = props.description;
    this.metadata = props.metadata;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  getId(): string | undefined {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getRideId(): string | undefined {
    return this.rideId;
  }

  getAmount(): number {
    return this.amount;
  }

  getType(): WalletTransactionType {
    return this.type;
  }

  getDescription(): string {
    return this.description;
  }

  getMetadata(): Record<string, unknown> | undefined {
    return this.metadata;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
