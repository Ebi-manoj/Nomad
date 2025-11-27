import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type { WalletDetailsDTO } from './wallet';

const WALLET_API = '/user/wallet';

export async function fetchWalletDetailsApi() {
  const res = await axiosInstance.get<ApiResponse<WalletDetailsDTO>>(
    WALLET_API
  );
  return res.data.data;
}
