import { UserResponseDTO } from '../../../domain/dto/authDTO';
import { UpdateFailed, UserNotFound } from '../../../domain/errors/CustomError';
import { userMapper } from '../../mappers/UserResponse.mapper';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IBlockUserUseCase } from './IBlockUserUseCase';

export class BlockUserUseCase implements IBlockUserUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserResponseDTO> {
    const user = await this._userRepository.findById(id);
    if (!user) throw new UserNotFound();
    user.toggleIsBlocked();
    const updatedUser = await this._userRepository.update(user.getId(), user);
    if (!updatedUser) throw new UpdateFailed();
    return userMapper(updatedUser);
  }
}
