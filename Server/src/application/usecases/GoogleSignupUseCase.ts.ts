import { LoginuserResponseDTO } from '../../domain/dto/authDTO';
import { User } from '../../domain/entities/User';
import { InvalidToken } from '../../domain/errors/CustomError';
import { Email } from '../../domain/value-objects/email';
import { userMapper } from '../mappers/RegisterUser.mapper';
import { IGoogleClient } from '../providers/IGoogleClient';
import { ITOkenGenerator } from '../providers/ITokenGenerator';
import { UserRepository } from '../repositories/UserRepository';

export class GoogleSignupUseCase {
  constructor(
    private readonly authClient: IGoogleClient,
    private readonly userRepository: UserRepository,
    private readonly tokenGenerator: ITOkenGenerator
  ) {}

  async execute(data: { code: string }): Promise<LoginuserResponseDTO> {
    console.log(data);
    const payload = await this.authClient.getAuthDetails(data.code);
    if (!payload) throw new InvalidToken();

    const email = new Email(payload.email);
    const isExist = await this.userRepository.findByEmail(email.getValue());
    let savedUser: User;
    if (isExist) {
      savedUser = isExist;
    } else {
      const user = new User({ email, fullName: payload.name });
      savedUser = await this.userRepository.create(user);
    }

    const accessToken = this.tokenGenerator.generateToken(
      { userId: savedUser.getId() },
      '5min'
    );

    const refreshToken = this.tokenGenerator.generateToken(
      { userId: savedUser.getId() },
      '7d'
    );
    return {
      accessToken,
      refreshToken,
      user: userMapper(savedUser),
    };
  }
}
