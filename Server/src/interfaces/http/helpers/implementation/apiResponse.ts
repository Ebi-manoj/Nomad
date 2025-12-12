import { IAPIResponse } from '../IApiResponse';

export class ApiResponse<T> implements IAPIResponse<T> {
  success: boolean;
  data?: T;
  error?: { message: string };
  private constructor(success: boolean, data?: T, error?: { message: string }) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
  static success<T>(data: T): ApiResponse<T> {
    return new ApiResponse<T>(true, data, undefined);
  }
  static error<T>(message: string): ApiResponse<T> {
    return new ApiResponse<T>(false, undefined, { message });
  }
}
