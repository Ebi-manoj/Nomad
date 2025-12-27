import { TransactionReferenceType, WalletTransactionStatus } from '../enums/Wallet';

export interface WalletTransactionDTO {
  id: string;
  referenceType: TransactionReferenceType;
  referenceId: string;
  metaData?: Record<string, unknown>;
  amount: number;
  type: string;
  description: string;
  status: WalletTransactionStatus;
  createdAt: Date;
}

export interface WalletDetailsDTO {
  balance: number;
  currency: string;
  transactions: WalletTransactionDTO[];
  totalCredits: number;
  totalDebits: number;
  pagination: {
    total: number;
  };
}
