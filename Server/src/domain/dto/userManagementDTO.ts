import { User } from '../entities/User';
import { UserResponseDTO } from './authDTO';

export interface GetAllUsersRequestDTO {
  limit: number;
  page: number;
  search?: string;
}

export interface GetAllUsersResponseDTO {
  users: UserResponseDTO[] | [];
  totalCount: number;
  page: number;
  totalPages: number;
}
