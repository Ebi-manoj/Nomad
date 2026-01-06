import type { User } from './auth';

export interface GetUserProfileResDTO {
  user: User;
  totalRides: number;
  totalHikes: number;
}

export interface UpdateUserProfileReqDTO {
  fullName: string;
  mobile?: string;
}

export interface UpdateUserProfileResDTO {
  user: User;
}
