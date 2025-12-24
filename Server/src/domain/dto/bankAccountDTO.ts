import { AccountType } from '../entities/BankAccount';

export interface BankAccountResponseDTO {
  id: string;
  userId: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountType: AccountType;
  fundAccountId?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddBankAccountDTO {
  userId: string;
  accountNumber: string;
  accountHolderName: string;
  ifscCode: string;
  accountType: AccountType;
}
