import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type { BankAccountDTO } from './bankAccount';

const BANK_ACCOUNTS_API = '/user/bank-accounts';

export async function fetchBankAccountsApi() {
  const res = await axiosInstance.get<ApiResponse<BankAccountDTO[]>>(
    BANK_ACCOUNTS_API
  );
  return res.data.data;
}
