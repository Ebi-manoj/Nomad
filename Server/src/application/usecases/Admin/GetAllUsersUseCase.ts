import {
  GetAllUsersRequestDTO,
  GetAllUsersResponseDTO,
} from '../../../domain/dto/userManagementDTO';
import { userMapper } from '../../mappers/UserResponse.mapper';
import { UserRepository } from '../../repositories/UserRepository';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: GetAllUsersRequestDTO): Promise<GetAllUsersResponseDTO> {
    const { page, limit, search } = data;
    const skip = (page - 1) * limit;
    const users = await this.userRepository.fetchUsers(limit, skip, search);
    const mappedUsers = users.map(userDoc => userMapper(userDoc));
    const totalCount = await this.userRepository.countUsers(search);
    return {
      users: mappedUsers,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      page,
    };
  }
}
