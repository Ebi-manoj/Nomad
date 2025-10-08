import axiosInstance from '@/utils/axiosInstance';
import type { emailFormData } from '@/validation/auth';
import { useHandleApiError } from './useHandleApiError';
import type { otpPurpose } from '@/types/auth';

export async function useSendOTP(
  data: emailFormData,
  purpose: otpPurpose
): Promise<{ success: boolean }> {
  try {
    const res = await axiosInstance.post(`/auth/send-otp/${purpose}`, data);
    const resData = res.data;
    const { email, expiry } = resData.data;
    sessionStorage.setItem(
      'otpDetails',
      JSON.stringify({ email, expiry, purpose })
    );
    return { success: true };
  } catch (error) {
    useHandleApiError(error);
    return { success: false };
  }
}
