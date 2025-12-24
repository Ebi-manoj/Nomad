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

export async function setPrimaryBankAccountApi(accountId: string) {
  const res = await axiosInstance.patch<ApiResponse<{ success: boolean }>>(
    `${BANK_ACCOUNTS_API}/${accountId}/primary`
  );
  return res.data.data;
}

export async function deleteBankAccountApi(accountId: string) {
  const res = await axiosInstance.delete<ApiResponse<{ success: boolean }>>(
    `${BANK_ACCOUNTS_API}/${accountId}`
  );
  return res.data.data;
}
