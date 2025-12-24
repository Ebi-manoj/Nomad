export enum ContactType {
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  EMPLOYEE = 'employee',
}

export enum AccountType {
  BANK_ACCOUNT = 'bank_account',
  VPA = 'vpa',
}
export enum PayoutMode {
  IMPS = 'IMPS',
  NEFT = 'NEFT',
  UPI = 'UPI',
}

export interface CreatePaymentContactDTO {
  name: string;
  email: string;
  contact?: string;
  type: ContactType;
}

export interface CreatePaymentContactResDTO {
  id: string;
  name: string;
  email: string;
  contact?: string;
}

export interface CreateFundAccountDTO {
  contactId: string;
  accountType: AccountType;
  bankAccount?: {
    name: string;
    ifsc: string;
    accountNumber: string;
  };
  vpa?: {
    address: string;
  };
}

export interface CreateFundAccountResDTO {
  id: string;
  contactId: string;
  accountType: string;
  active: boolean;
}

export interface CreatePayoutDTO {
  fundAccountId: string;
  amount: number;
  currency: string;
  mode: PayoutMode;
  purpose: 'refund' | 'cashback' | 'payout';
  narration: string;
  referenceId: string;
}

export interface PayoutResponse {
  id: string;
  status:
    | 'queued'
    | 'pending'
    | 'processing'
    | 'processed'
    | 'reversed'
    | 'cancelled';
  amount: number;
  utr?: string;
}
