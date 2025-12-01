import type {
  GetRideDetailsResDTO,
  HikerMatchedDTO,
  RideActivityItemDTO,
} from '@/types/ride';
import type { User } from '@/types/auth';

export interface AdminRideResponseDTO extends RideActivityItemDTO {
  user: User;
}

export interface GetAdminRidesResDTO {
  total: number;
  rideMetrics: {
    active: number;
    cancelled: number;
    completed: number;
  };
  rides: AdminRideResponseDTO[];
}

export interface AdminRideDetailsResDTO extends GetRideDetailsResDTO {
  rider: User;
}
