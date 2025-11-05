import {
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
} from '../../../domain/dto/authDTO';
import { ACCESS_TOKEN_EXPIRY } from '../../../domain/enums/Constants';
import { InvalidToken } from '../../../domain/errors/CustomError';
import { userMapper } from '../../mappers/UserResponse.mapper';
import { ITOkenGenerator } from '../../providers/ITokenGenerator';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IRefreshTokenUseCase } from './IRefreshTokenUseCase';

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private tokenGenerator: ITOkenGenerator,
    private readonly userRepostiory: IUserRepository
  ) {}

  async execute(
    data: RefreshTokenRequestDTO
  ): Promise<RefreshTokenResponseDTO> {
    const payload = this.tokenGenerator.verifyToken<{ userId: string }>(
      data.refreshToken
    );
    if (!payload) throw new InvalidToken();
    const user = await this.userRepostiory.findById(payload.userId);
    if (!user) throw new InvalidToken();

    const accessToken = this.tokenGenerator.generateToken(
      { userId: user.getId(), role: user.getRole() },
      ACCESS_TOKEN_EXPIRY
    );

    return {
      accessToken,
      user: userMapper(user),
    };
  }
}
