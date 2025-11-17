import { RideBookingOTPReqDTO } from '../../../../domain/dto/RideBookingDTO';

export interface IGetRideBookingOTPUseCase {
  execute(data: RideBookingOTPReqDTO): Promise<{ otp: string }>;
}
