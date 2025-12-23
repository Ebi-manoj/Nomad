import Razorpay from 'razorpay';
import { IPayoutService } from '../../application/providers/IPayoutService';
import {
  AccountType,
  CreateFundAccountDTO,
  CreateFundAccountResDTO,
  CreatePaymentContactDTO,
  CreatePaymentContactResDTO,
} from '../../domain/dto/Payouts';

export interface RazorpayContactParams {
  name: string;
  email: string;
  contact: string;
  type: string;
  reference_id?: string;
  notes?: Record<string, any>;
}

export interface RazorpayContact {
  id: string;
  name: string;
  email: string;
  contact: string;
  type: string;
  reference_id?: string;
}

export interface RazorpayFundAccountParams {
  contact_id: string;
  account_type: 'bank_account' | 'vpa';
  bank_account?: {
    name: string;
    ifsc: string;
    account_number: string;
  };
  vpa?: {
    address: string;
  };
}

export interface RazorpayFundAccount {
  id: string;
  contact_id: string;
  account_type: string;
  bank_account?: {
    name: string;
    ifsc: string;
    account_number: string;
  };
  vpa?: {
    address: string;
  };
  active: boolean;
}

export interface RazorpayPayoutParams {
  account_number: string;
  fund_account_id: string;
  amount: number;
  currency: string;
  mode: 'IMPS' | 'NEFT' | 'RTGS' | 'UPI';
  purpose: string;
  queue_if_low_balance?: boolean;
  reference_id: string;
  narration: string;
  notes?: Record<string, any>;
}

export interface RazorpayPayout {
  id: string;
  entity: string;
  fund_account_id: string;
  amount: number;
  currency: string;
  status:
    | 'queued'
    | 'pending'
    | 'processing'
    | 'processed'
    | 'reversed'
    | 'cancelled';
  purpose: string;
  utr?: string;
  mode: string;
  reference_id: string;
  narration: string;
  fees: number;
  tax: number;
  created_at: number;
  processed_at?: number;
}

export interface RazorpayClient {
  contacts: {
    create(params: RazorpayContactParams): Promise<RazorpayContact>;
    fetch(contactId: string): Promise<RazorpayContact>;
  };
  fundAccount: {
    create(params: RazorpayFundAccountParams): Promise<RazorpayFundAccount>;
    fetch(fundAccountId: string): Promise<RazorpayFundAccount>;
  };
  payouts: {
    create(params: RazorpayPayoutParams): Promise<RazorpayPayout>;
    fetch(payoutId: string): Promise<RazorpayPayout>;
  };
}

export class RazorPayPayoutService implements IPayoutService {
  private readonly _razorpay: RazorpayClient;
  constructor() {
    this._razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    }) as unknown as RazorpayClient;
  }

  async createContact(
    data: CreatePaymentContactDTO
  ): Promise<CreatePaymentContactResDTO> {
    try {
      const contact = await this._razorpay.contacts.create({
        name: data.name,
        email: data.email,
        contact: data.contact,
        type: data.type,
        reference_id: `contact_${Date.now()}`,
        notes: {
          created_at: new Date().toISOString(),
        },
      });

      return {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        contact: contact.contact,
      };
    } catch (error) {
      console.error('Razorpay createContact error:', error);
      throw new Error('Failed to create contact');
    }
  }

  async createFundAccount(
    data: CreateFundAccountDTO
  ): Promise<CreateFundAccountResDTO> {
    try {
      const fundAccountData: Partial<RazorpayFundAccount> = {
        contact_id: data.contactId,
        account_type: data.accountType,
      };

      if (data.accountType === 'bank_account' && data.bankAccount) {
        fundAccountData.bank_account = {
          name: data.bankAccount.name,
          ifsc: data.bankAccount.ifsc,
          account_number: data.bankAccount.accountNumber,
        };
      } else if (data.accountType === 'vpa' && data.vpa) {
        fundAccountData.vpa = {
          address: data.vpa.address,
        };
      }

      const fundAccount = await this._razorpay.fundAccount.create(
        fundAccountData as RazorpayFundAccountParams
      );

      return {
        id: fundAccount.id,
        contactId: fundAccount.contact_id,
        accountType: fundAccount.account_type as AccountType,
        active: fundAccount.active,
      };
    } catch (error) {
      console.error('Razorpay createFundAccount error:', error);
      throw new Error('Failed to create fund account');
    }
  }
}
