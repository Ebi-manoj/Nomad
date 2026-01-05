import { UserResponseDTO } from './authDTO';

export interface GetUserProfileResDTO {
  user: UserResponseDTO;
  totalRides: number;
  totalHikes: number;
}

export interface UpdateUserProfileReqDTO {
  fullName: string;
  mobile?: string;
}

export interface UpdateUserProfileResDTO {
  user: UserResponseDTO;
}
