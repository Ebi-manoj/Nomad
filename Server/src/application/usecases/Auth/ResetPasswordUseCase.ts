import { ResetPasswordRequestDTO } from '../../../domain/dto/authDTO';
import { SuccessMessages } from '../../../domain/enums/SuccessMessage';
import { UserNotFound } from '../../../domain/errors/CustomError';
import { Email } from '../../../domain/value-objects/email';
import { PasswordHasher } from '../../providers/IpasswordHasher';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IResetPasswordUseCase } from './IResetPassword';

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _passwordHasher: PasswordHasher
  ) {}

  async execute(data: ResetPasswordRequestDTO): Promise<{ message: string }> {
    const emailVO = new Email(data.email);
    const user = await this._userRepository.findByEmail(emailVO.getValue());
    if (!user) throw new UserNotFound();

    const hashedPassword = await this._passwordHasher.hash(data.password);
    user.setPassword(hashedPassword);
    await this._userRepository.update(user.getId(), user);
    return {
      message: SuccessMessages.PASSWORD_RESET,
    };
  }
}
