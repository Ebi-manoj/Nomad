import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type { WalletDetailsDTO } from './wallet';

const WALLET_API = '/user/wallet';

export async function fetchWalletDetailsApi(page: number = 1) {
  const res = await axiosInstance.get<ApiResponse<WalletDetailsDTO>>(
    WALLET_API,
    {
      params: { page },
    }
  );
  return res.data.data;
}

export async function withdrawApi() {
  const res = await axiosInstance.post<ApiResponse<{ success: boolean }>>(
    `${WALLET_API}/withdraw`
  );
  return res.data.data;
}
