import {
  LoginUserRequestDTO,
  LoginuserResponseDTO,
} from '../../../domain/dto/authDTO';
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from '../../../domain/enums/Constants';
import {
  InvalidCredindatials,
  SuspendedAccount,
} from '../../../domain/errors/CustomError';
import { Email } from '../../../domain/value-objects/email';
import { userMapper } from '../../mappers/UserResponse.mapper';
import { ILogger } from '../../providers/ILogger';
import { PasswordHasher } from '../../providers/IpasswordHasher';
import { ITOkenGenerator } from '../../providers/ITokenGenerator';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ILoginUserUsecase } from './ILoginUserUseCase';

export class LoginUserUsecase implements ILoginUserUsecase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _userRepository: IUserRepository,
    private readonly _passwordHasher: PasswordHasher,
    private readonly _tokenGenerator: ITOkenGenerator
  ) {}

  async execute(data: LoginUserRequestDTO): Promise<LoginuserResponseDTO> {
    this._logger.info('Login UseCase executing with', data);
    const email = new Email(data.email);
    const user = await this._userRepository.findByEmail(email.getValue());
    if (!user) throw new InvalidCredindatials();
    if (user.getIsBlocked()) throw new SuspendedAccount();
    const password = user.getPassword();
    if (!password) throw new InvalidCredindatials();

    const isMatch = await this._passwordHasher.compare(data.password, password);
    if (!isMatch) throw new InvalidCredindatials();

    const accessToken = this._tokenGenerator.generateToken(
      { userId: user.getId(), role: user.getRole() },
      ACCESS_TOKEN_EXPIRY
    );
    const refreshToken = this._tokenGenerator.generateToken(
      { userId: user.getId(), role: user.getRole() },
      REFRESH_TOKEN_EXPIRY
    );
    return { accessToken, refreshToken, user: userMapper(user) };
  }
}
