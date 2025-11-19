import {
  BookingLiveReqDTO,
  BookingLiveResDTO,
} from '../../../../domain/dto/RideBookingDTO';

export interface IGetBookingLiveUseCase {
  execute(data: BookingLiveReqDTO): Promise<BookingLiveResDTO>;
}
