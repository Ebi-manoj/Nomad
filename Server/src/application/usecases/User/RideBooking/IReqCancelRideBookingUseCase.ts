import {
  ReqCancelBookingReqDTO,
  ReqCancelBookingResDTO,
} from '../../../../domain/dto/RideBookingDTO';

export interface IReqCancelRideBookingUseCase {
  execute(data: ReqCancelBookingReqDTO): Promise<ReqCancelBookingResDTO>;
}
