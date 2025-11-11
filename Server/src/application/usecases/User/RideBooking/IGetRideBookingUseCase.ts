import {
  RideBookingRequestDTO,
  RideBookingResponseDTO,
} from '../../../../domain/dto/RideBookingDTO';

export interface IGetRideBookingUseCase {
  execute(data: RideBookingRequestDTO): Promise<RideBookingResponseDTO>;
}
