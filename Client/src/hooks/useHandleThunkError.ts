import { ErrorMessage } from '@/utils/constants';
import { isAxiosError } from 'axios';

export function useHandleThunkError(
  error: unknown,
  rejectWithValue: any,
  defaultMsge: string
) {
  console.log('error object', error);
  if (isAxiosError(error)) {
    console.log('axios');
    return rejectWithValue(error.response?.data?.error?.message || defaultMsge);
  }
  return rejectWithValue(ErrorMessage.SERVER_ERROR);
}
