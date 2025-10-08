import { ErrorMessage } from '@/utils/constants';
import { isAxiosError } from 'axios';

export function useHandleThunkError(
  error: unknown,
  rejectWithValue: any,
  defaultMsge: string
) {
  if (isAxiosError(error)) {
    return rejectWithValue(error.response?.data?.error?.message || defaultMsge);
  }
  return rejectWithValue(ErrorMessage.SERVER_ERROR);
}
