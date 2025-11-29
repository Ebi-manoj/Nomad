import type { HikeResponseDTO } from '@/store/features/user/hike/hike';
import type { User } from '@/types/auth';

export interface AdminHikeResponseDTO extends HikeResponseDTO {
  user: User;
}

export interface GetAdminHikesResDTO {
  hikes: AdminHikeResponseDTO[];
  total: number;
  hikeMetrics: {
    completed: number;
    active: number;
    cancelled: number;
  };
}
