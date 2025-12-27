export interface WalletTransactionDTO {
  id: string;
  amount: number;
  type: string; // e.g. 'CREDIT' | 'DEBIT'
  description: string;
  status: 'PROCESSING' | 'SUCCESS' | 'FAILED';
  createdAt: string | Date;
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

export interface WalletState {
  loading: boolean;
  error: string;
  walletData: WalletDetailsDTO;
}
