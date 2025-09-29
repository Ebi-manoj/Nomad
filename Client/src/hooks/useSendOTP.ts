import axiosInstance from '@/utils/axiosInstance';
import type { signUpFormData } from '@/validation/auth';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

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
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.error.message ||
        'An error occurred during sign in';
      toast.error(message, {
        description: 'Please contact support for more',
      });
      console.log('isAxios');
    } else {
      toast.error('Unable to connect to the server. Please try again.');
      console.log('not axios');
    }
    return { success: false };
  }
}
