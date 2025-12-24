import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type { BankAccountDTO, CreateBankAccountDTO } from './bankAccount';

const BANK_ACCOUNTS_API = '/user/bank-accounts';

export async function fetchBankAccountsApi() {
  const res = await axiosInstance.get<ApiResponse<BankAccountDTO[]>>(
    BANK_ACCOUNTS_API
  );
  return res.data.data;
}
export async function addBankAccountApi(data: CreateBankAccountDTO) {
  const res = await axiosInstance.post<ApiResponse<BankAccountDTO>>(
    BANK_ACCOUNTS_API,
    data
  );
  return res.data.data;
}
