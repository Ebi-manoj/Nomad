import {
  LoginAdminRequestDTO,
  LoginAdminResponseDTO,
} from '../../../domain/dto/authDTO';
import {
  ACCESS_TOKEN_EXPIRY,
  ADMIN_ROLE,
  REFRESH_TOKEN_EXPIRY,
} from '../../../domain/enums/Constants';
import { InvalidCredindatials } from '../../../domain/errors/CustomError';
import { Email } from '../../../domain/value-objects/email';
import { adminMapper } from '../../mappers/AdminResponse.mapper';
import { PasswordHasher } from '../../providers/IpasswordHasher';
import { ITOkenGenerator } from '../../providers/ITokenGenerator';
import { IAdminRepository } from '../../repositories/IAdminRepostiory';

export class AdminLoginUseCase {
  constructor(
    private readonly adminRepository: IAdminRepository,
    private readonly tokenGenerator: ITOkenGenerator,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(data: LoginAdminRequestDTO): Promise<LoginAdminResponseDTO> {
    const email = new Email(data.email);

    const found = await this.adminRepository.findByEmail(email.getValue());
    if (!found) throw new InvalidCredindatials();

    const isMatched = await this.passwordHasher.compare(
      data.password,
      found.getPassword()
    );
    if (!isMatched) throw new InvalidCredindatials();

    const accessToken = this.tokenGenerator.generateToken(
      {
        userId: found.getId(),
        role: ADMIN_ROLE,
      },
      ACCESS_TOKEN_EXPIRY
    );

    const refreshToken = this.tokenGenerator.generateToken(
      { userId: found.getId(), role: ADMIN_ROLE },
      REFRESH_TOKEN_EXPIRY
    );

    return {
      accessToken,
      refreshToken,
      admin: adminMapper(found),
    };
  }
}
