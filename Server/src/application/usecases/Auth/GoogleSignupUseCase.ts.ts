import { LoginuserResponseDTO } from '../../../domain/dto/authDTO';
import { User } from '../../../domain/entities/User';
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from '../../../domain/enums/Constants';

import { USER } from '../../../domain/enums/Constants';

import {
  InvalidToken,
  SuspendedAccount,
} from '../../../domain/errors/CustomError';
import { Email } from '../../../domain/value-objects/email';
import { userMapper } from '../../mappers/UserResponse.mapper';
import { IGoogleClient } from '../../providers/IGoogleClient';
import { ITOkenGenerator } from '../../providers/ITokenGenerator';
import { UserRepository } from '../../repositories/UserRepository';

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
      if (isExist.getIsBlocked()) throw new SuspendedAccount();
      savedUser = isExist;
    } else {
      const user = new User({
        email,
        fullName: payload.name,
        role: USER,
        isBlocked: false,
        aadhaarVerified: false,
        licenceVerified: false,
      });
      savedUser = await this.userRepository.create(user);
    }

    const accessToken = this.tokenGenerator.generateToken(
      { userId: savedUser.getId(), role: savedUser.getRole() },
      ACCESS_TOKEN_EXPIRY
    );

    const refreshToken = this.tokenGenerator.generateToken(
      { userId: savedUser.getId(), role: savedUser.getRole() },
      REFRESH_TOKEN_EXPIRY
    );
    return {
      accessToken,
      refreshToken,
      user: userMapper(savedUser),
    };
  }
}
