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
  transactions: WalletTransactionApiDTO[];
  totalCredits: number;
  totalDebits: number;
  pagination: {
    total: number;
  };
}

export interface WalletState {
  loading: boolean;
  error: string;
  walletData: WalletDetailsDTO;
}
