import {
  LoginUserRequestDTO,
  LoginuserResponseDTO,
} from '../../domain/dto/authDTO';
import { InvalidCredindatials } from '../../domain/errors/CustomError';
import { Email } from '../../domain/value-objects/email';
import { userMapper } from '../mappers/RegisterUser.mapper';
import { PasswordHasher } from '../providers/IpasswordHasher';
import { ITOkenGenerator } from '../providers/ITokenGenerator';
import { UserRepository } from '../repositories/UserRepository';

export class LoginUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenGenerator: ITOkenGenerator
  ) {}

  async execute(data: LoginUserRequestDTO): Promise<LoginuserResponseDTO> {
    const email = new Email(data.email);
    const user = await this.userRepository.findByEmail(email.getValue());
    if (!user) throw new InvalidCredindatials();
    console.log('User Found');

    const password = user.getPassword();
    if (!password) throw new InvalidCredindatials();

    const isMatch = await this.passwordHasher.compare(data.password, password);
    if (!isMatch) throw new InvalidCredindatials();

    const accessToken = this.tokenGenerator.generateToken(
      { userId: user.getId() },
      '5min'
    );
    const refreshToken = this.tokenGenerator.generateToken(
      { userId: user.getId() },
      '7d'
    );
    return { accessToken, refreshToken, user: userMapper(user) };
  }
}
