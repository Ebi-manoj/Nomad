import {
  RegisterUserRequestDTO,
  RegisterUserResponseDTO,
} from '../../domain/dto/authDTO';
import { User } from '../../domain/entities/User';
import { UserAlreadyExist } from '../../domain/errors/CustomError';
import { Email } from '../../domain/value-objects/email';
import { Mobile } from '../../domain/value-objects/mobile';
import { registerUserMapper } from '../mappers/RegisterUser.mapper';
import { PasswordHasher } from '../providers/IpasswordHasher';
import { UserRepository } from '../repositories/UserRepository';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(
    data: RegisterUserRequestDTO
  ): Promise<RegisterUserResponseDTO> {
    console.log('Reached here');
    const email = new Email(data.email);
    const mobile = new Mobile(data.mobile);

    const existingByEmail = await this.userRepository.findByEmail(
      email.getValue()
    );
    if (existingByEmail) throw new UserAlreadyExist();

    const existingByMobile = await this.userRepository.findByMobile(
      mobile.getValue()
    );
    if (existingByMobile) throw new UserAlreadyExist();

    const hashedPassword = await this.passwordHasher.hash(data.password);

    const user = new User({
      fullName: data.fullName,
      email,
      mobile,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.create(user);
    return registerUserMapper(savedUser);
  }
}
