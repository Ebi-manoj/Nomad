import type { UserResponseDTO } from '../../../../domain/dto/authDTO';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { UserNotFound, UpdateFailed } from '../../../../domain/errors/CustomError';
import { userMapper } from '../../../mappers/UserResponse.mapper';
import { IUpdateUserProfileImageUseCase } from './IUpdateUserProfileImageUseCase';

export class UpdateUserProfileImageUseCase
  implements IUpdateUserProfileImageUseCase
{
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(userId: string, fileURL: string): Promise<UserResponseDTO> {
    const user = await this._userRepository.findById(userId);
    if (!user) throw new UserNotFound();
    user.setProfilePic(fileURL);
    const updated = await this._userRepository.update(user.getId(), user);
    if (!updated) throw new UpdateFailed();
    return userMapper(updated);
  }
}
