import { ConfirmHikerPaymentDTO } from '../../../../domain/dto/paymentDTO';

export interface IConfirmHikerPayment {
  execute(paymentIntentId: string): Promise<ConfirmHikerPaymentDTO>;
}
