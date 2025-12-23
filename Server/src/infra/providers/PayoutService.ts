import Razorpay from 'razorpay';
import { IPayoutService } from '../../application/providers/IPayoutService';
import {
  AccountType,
  CreateFundAccountDTO,
  CreateFundAccountResDTO,
  CreatePaymentContactDTO,
  CreatePaymentContactResDTO,
} from '../../domain/dto/Payouts';
import { env } from '../utils/env';
import axios, { AxiosInstance } from 'axios';

export interface RazorpayContact {
  id: string;
  entity: string;
  name: string;
  email: string;
  contact: string;
  type: string;
  reference_id?: string;
  batch_id?: string | null;
  active: boolean;
  notes: Record<string, unknown>;
  created_at: number;
}

export interface RazorpayFundAccount {
  id: string;
  entity: string;
  contact_id: string;
  account_type: string;
  bank_account?: {
    name: string;
    ifsc: string;
    account_number: string;
    bank_name: string;
  };
  vpa?: {
    address: string;
    username: string;
    handle: string;
  };
  batch_id?: string | null;
  active: boolean;
  created_at: number;
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

export class RazorPayPayoutService implements IPayoutService {
  private readonly _baseURL: string;
  private readonly _client: AxiosInstance;
  constructor() {
    this._baseURL = 'https://api.razorpay.com/v1';
    this._client = axios.create({
      baseURL: this._baseURL,
      auth: {
        username: env.RAZORPAY_KEY_ID,
        password: env.RAZORPAY_SECRET,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async createContact(
    data: CreatePaymentContactDTO
  ): Promise<CreatePaymentContactResDTO> {
    try {
      const response = await this._client.post<RazorpayContact>('/contacts', {
        name: data.name,
        email: data.email,
        contact: data.contact,
        type: data.type,
        reference_id: `contact_${Date.now()}`,
        notes: {
          created_at: new Date().toISOString(),
        },
      });

      const contact = response.data;

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
      const fundAccountData: RazorpayFundAccountParams = {
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

      const response = await this._client.post<RazorpayFundAccount>(
        '/fund_accounts',
        fundAccountData
      );

      const fundAccount = response.data;

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
