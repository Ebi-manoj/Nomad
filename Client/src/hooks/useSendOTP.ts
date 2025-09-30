import axiosInstance from '@/utils/axiosInstance';
import type { signUpFormData } from '@/validation/auth';

import { useHandleApiError } from './useHandleApiError';

export async function useSendOTP(
  data: signUpFormData
): Promise<{ success: boolean }> {
  try {
    const res = await axiosInstance.post('/auth/send-otp', data);
    const resData = res.data;
    const { email, expiry } = resData.data;
    sessionStorage.setItem('otpDetails', JSON.stringify({ email, expiry }));
    return { success: true };
  } catch (error) {
    useHandleApiError(error);
    return { success: false };
  }
}
