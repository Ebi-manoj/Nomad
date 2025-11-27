import { TransactionReferenceType } from '../enums/Wallet';

export interface WalletTransactionDTO {
  id: string;
  referenceType: TransactionReferenceType;
  referenceId: string;
  metaData?: Record<string, unknown>;
  amount: number;
  type: string;
  description: string;
  createdAt: Date;
}

export interface WalletDetailsDTO {
  balance: number;
  currency: string;
  transactions: WalletTransactionDTO[];
  pagination: {
    total: number;
  };
}
