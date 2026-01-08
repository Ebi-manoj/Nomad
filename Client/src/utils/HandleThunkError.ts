import { ErrorMessage } from '@/utils/constants';
import { isAxiosError } from 'axios';

export function handleThunkError<T>(
  error: unknown,
  rejectWithValue: (value: T) => T,
  defaultMsge: string = ErrorMessage.SOMETHING_WENT_WRONG
) {
  console.log('error object', error);
  if (isAxiosError(error)) {
    return rejectWithValue(error.response?.data?.error?.message || defaultMsge);
  }
  return rejectWithValue(ErrorMessage.SERVER_ERROR as T);
}
