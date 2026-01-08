import { ErrorMessage } from '@/utils/constants';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export function handleApiError(error: unknown) {
  if (isAxiosError(error)) {
    const message =
      error.response?.data?.error?.message || ErrorMessage.SOMETHING_WENT_WRONG;
    toast.error(message, {
      description: 'Please contact support for more',
    });
    console.log('isAxios');
  } else {
    toast.error('Unable to connect to the server. Please try again.');
    console.log('not axios');
  }
}
