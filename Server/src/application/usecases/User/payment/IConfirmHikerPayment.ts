import { RideBooking } from '../../../../domain/entities/RideBooking';

export interface IConfirmHikerPayment {
  execute(paymentIntentId: string): Promise<RideBooking>;
}
