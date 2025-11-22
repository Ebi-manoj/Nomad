import {
  CancelRideBookingReqDTO,
  CancelRideBookingResDTO,
} from '../../../../domain/dto/RideBookingDTO';

export interface ICancelRideBookingUseCase {
  execute(data: CancelRideBookingReqDTO): Promise<CancelRideBookingResDTO>;
}
