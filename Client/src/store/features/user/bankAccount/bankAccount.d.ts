export type AccountType = 'savings' | 'current';

export interface BankAccountDTO {
  id: string;
  userId: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountType: AccountType;
  fundAccountId?: string;
  isVerified: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface BankAccountState {
  loading: boolean;
  error: string;
  accounts: BankAccountDTO[];
}
