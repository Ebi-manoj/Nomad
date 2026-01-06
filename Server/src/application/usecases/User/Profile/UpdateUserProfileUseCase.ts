import type { UpdateUserProfileReqDTO, UpdateUserProfileResDTO } from '../../../../domain/dto/userProfileDTO';
import { userMapper } from '../../../mappers/UserResponse.mapper';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { UpdateFailed, UserNotFound } from '../../../../domain/errors/CustomError';
import { IUpdateUserProfileUseCase } from './IUpdateUserProfileUseCase';

export class UpdateUserProfileUseCase implements IUpdateUserProfileUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(
    userId: string,
    dto: UpdateUserProfileReqDTO
  ): Promise<UpdateUserProfileResDTO> {
    const user = await this._userRepository.findById(userId);
    if (!user) throw new UserNotFound();

    user.setFullName(dto.fullName);
    if (dto.mobile !== undefined) user.setMobile(dto.mobile);

    const updated = await this._userRepository.update(user.getId(), user);
    if (!updated) throw new UpdateFailed();

    return { user: userMapper(updated) };
  }
}
