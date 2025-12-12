import {
  TransactionReferenceType,
  WalletTransactionType,
} from '../enums/Wallet';

export interface WalletTransactionProps {
  id?: string;
  userId: string;
  referenceType: TransactionReferenceType;
  referenceId: string;
  amount: number;
  type: WalletTransactionType;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}

export class WalletTransaction {
  private _id?: string;
  private _userId: string;
  private _referenceType: TransactionReferenceType;
  private _referenceId: string;
  private _amount: number;
  private _type: WalletTransactionType;
  private _description: string;
  private _metadata?: Record<string, unknown>;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: WalletTransactionProps) {
    this._id = props.id;
    this._userId = props.userId;
    this._referenceType = props.referenceType;
    this._referenceId = props.referenceId;
    this._amount = props.amount;
    this._type = props.type;
    this._description = props.description;
    this._metadata = props.metadata;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  getId(): string | undefined {
    return this._id;
  }

  getUserId(): string {
    return this._userId;
  }
  getReferenceType(): TransactionReferenceType {
    return this._referenceType;
  }

  getReferenceId(): string {
    return this._referenceId;
  }

  getAmount(): number {
    return this._amount;
  }

  getType(): WalletTransactionType {
    return this._type;
  }

  getDescription(): string {
    return this._description;
  }

  getMetadata(): Record<string, unknown> | undefined {
    return this._metadata;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }
}
