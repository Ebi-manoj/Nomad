import { UserResponseDTO } from '../../../domain/dto/authDTO';
import { UpdateFailed, UserNotFound } from '../../../domain/errors/CustomError';
import { userMapper } from '../../mappers/UserResponse.mapper';
import { UserRepository } from '../../repositories/UserRepository';

export class BlockUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFound();
    user.toggleIsBlocked();
    const updatedUser = await this.userRepository.updateUser(user);
    if (!updatedUser) throw new UpdateFailed();
    return userMapper(updatedUser);
  }
}
