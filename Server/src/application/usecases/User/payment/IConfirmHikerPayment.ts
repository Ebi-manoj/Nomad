export interface IConfirmHikerPayment {
  execute(paymentIntentId: string): Promise<void>;
}
