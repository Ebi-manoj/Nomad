export interface IAPIDTO<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
  };
}
