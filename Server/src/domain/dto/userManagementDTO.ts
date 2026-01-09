import { UserResponseDTO } from './authDTO';

export interface GetAllUsersRequestDTO {
  limit: number;
  page: number;
  search?: string;
  sort?: 'newest' | 'oldest';
}

export interface GetAllUsersResponseDTO {
  users: UserResponseDTO[] | [];
  totalCount: number;
  page: number;
  totalPages: number;
}
