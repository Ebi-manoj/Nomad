import { IAPIDTO } from '../IApiDTO';

export class ApiDTO<T> implements IAPIDTO<T> {
  success: boolean;
  data?: T;
  error?: { message: string };
  private constructor(success: boolean, data?: T, error?: { message: string }) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
  static success<T>(data: T): ApiDTO<T> {
    return new ApiDTO<T>(true, data, undefined);
  }
  static error<T>(message: string): ApiDTO<T> {
    return new ApiDTO<T>(false, undefined, { message });
  }
}
