import { UserResponseDTO } from './authDTO';
import { HikeResponseDTO } from './HikeDTO';
import { PaymentResponseDTO } from './paymentDTO';
import { BookingResponseDTO, RideBookingResponseDTO } from './RideBookingDTO';

export interface adminHikeResponseDTO extends HikeResponseDTO {
  user: UserResponseDTO;
}

export interface GetAllHikesResDTO {
  hikes: adminHikeResponseDTO[];
  total: number;
  hikeMetrics: {
    completed: number;
    active: number;
    cancelled: number;
  };
}

export interface RiderResponseDTO extends UserResponseDTO {
  vehicle: {
    model: string;
    type: string;
    number: string;
  };
}

export interface AdminGetHikeDetailsResDTO extends HikeResponseDTO {
  user: UserResponseDTO;
  rider?: RiderResponseDTO;
  booking?: BookingResponseDTO;
  payment?: PaymentResponseDTO;
}
