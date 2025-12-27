import { SuccessMessages } from '../../../domain/enums/SuccessMessage';
import {
  GoogleAuthResetPasswordError,
  InvalidCredindatials,
  UserNotFound,
} from '../../../domain/errors/CustomError';
import { PasswordHasher } from '../../providers/IpasswordHasher';
import { IUserRepository } from '../../repositories/IUserRepository';
import {
  ChangePasswordRequest,
  IChangePasswordUseCase,
} from './IChangePasswordUseCase';

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _passwordHasher: PasswordHasher
  ) {}

  async execute(data: ChangePasswordRequest): Promise<{ message: string }> {
    const user = await this._userRepository.findById(data.userId);
    if (!user) throw new UserNotFound();

    const current = user.getPassword();
    if (!current) throw new GoogleAuthResetPasswordError();

    const isMatch = await this._passwordHasher.compare(
      data.currentPassword,
      current
    );
    if (!isMatch) throw new InvalidCredindatials();

    const hashed = await this._passwordHasher.hash(data.newPassword);
    user.setPassword(hashed);
    await this._userRepository.update(user.getId(), user);

    return { message: SuccessMessages.UPDATED_SUCCESS };
  }
}
