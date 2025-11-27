export interface WalletTransactionDTO {
  id: string;
  rideId?: string;
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
