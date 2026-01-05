import type { User } from './auth';

export interface GetUserProfileResDTO {
  user: User;
  totalRides: number;
  totalHikes: number;
}
