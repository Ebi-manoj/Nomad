import {
  GetAllUsersRequestDTO,
  GetAllUsersResponseDTO,
} from '../../../domain/dto/userManagementDTO';
import { userMapper } from '../../mappers/UserResponse.mapper';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IGetAllUsersUseCase } from './IGetAllUsersUseCase';

export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(data: GetAllUsersRequestDTO): Promise<GetAllUsersResponseDTO> {
    const { page, limit, search, sort } = data;
    const skip = (page - 1) * limit;
    const users = await this._userRepository.fetchUsers(
      limit,
      skip,
      search,
      sort
    );
    const mappedUsers = users.map(userDoc => userMapper(userDoc));
    const totalCount = await this._userRepository.countUsers(search);
    return {
      users: mappedUsers,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      page,
    };
  }
}
