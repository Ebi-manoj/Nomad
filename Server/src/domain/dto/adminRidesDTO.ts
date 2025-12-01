import { UserResponseDTO } from './authDTO';
import {
  GetRideDetailsResDTO,
  HikerMatchedDTO,
  RideResponseDTO,
} from './RideDTO';

export interface GetRidesReqDTO {
  userId: string;
  page: number;
  status?: string;
}

export interface AdminRideResDTO extends RideResponseDTO {
  user: UserResponseDTO;
}

export interface GetAdminRidesResDTO {
  total: number;
  rideMetrics: {
    active: number;
    cancelled: number;
    completed: number;
  };
  rides: AdminRideResDTO[];
}

export interface AdminHikerMatchedDTO extends HikerMatchedDTO {
  platformFee: number;
}

export interface AdminGetRideDetailsResDTO extends GetRideDetailsResDTO {
  rider: UserResponseDTO;
  hikersMatched: AdminHikerMatchedDTO[];
}
