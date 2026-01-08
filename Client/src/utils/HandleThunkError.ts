import { ErrorMessage } from '@/utils/constants';
import { isAxiosError } from 'axios';

export function handleThunkError<TRejectValue = string>(
  error: unknown,
  rejectWithValue: (value: TRejectValue) => unknown,
  defaultMsge: string = ErrorMessage.SOMETHING_WENT_WRONG
) {
  console.log('error object', error);
  if (isAxiosError(error)) {
    return rejectWithValue(error.response?.data?.error?.message || defaultMsge);
  }
  return rejectWithValue(ErrorMessage.SERVER_ERROR as TRejectValue);
}
