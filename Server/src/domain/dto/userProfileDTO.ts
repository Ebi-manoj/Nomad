import { UserResponseDTO } from './authDTO';

export interface GetUserProfileResDTO {
  user: UserResponseDTO;
  totalRides: number;
  totalHikes: number;
}
