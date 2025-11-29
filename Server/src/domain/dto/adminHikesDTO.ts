import { UserResponseDTO } from './authDTO';
import { HikeResponseDTO } from './HikeDTO';

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
