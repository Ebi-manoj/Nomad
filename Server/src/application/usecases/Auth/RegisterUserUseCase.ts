import {
  RegisterUserRequestDTO,
  UserResponseDTO,
} from '../../../domain/dto/authDTO';
import { User } from '../../../domain/entities/User';
import { USER } from '../../../domain/enums/Constants';
import { UserAlreadyExist } from '../../../domain/errors/CustomError';
import { Email } from '../../../domain/value-objects/email';
import { Mobile } from '../../../domain/value-objects/mobile';
import { userMapper } from '../../mappers/UserResponse.mapper';
import { PasswordHasher } from '../../providers/IpasswordHasher';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IRegisterUserUseCase } from './IRegisterUserUseCase';

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _passwordHasher: PasswordHasher
  ) {}

  async execute(data: RegisterUserRequestDTO): Promise<UserResponseDTO> {
    const email = new Email(data.email);
    const mobile = new Mobile(data.mobile);

    const existingByEmail = await this._userRepository.findByEmail(
      email.getValue()
    );
    if (existingByEmail) throw new UserAlreadyExist();

    const existingByMobile = await this._userRepository.findByMobile(
      mobile.getValue()
    );
    if (existingByMobile) throw new UserAlreadyExist();

    const hashedPassword = await this._passwordHasher.hash(data.password);

    const user = new User({
      fullName: data.fullName,
      email,
      mobile,
      password: hashedPassword,
      role: USER,
      isBlocked: false,
      aadhaarVerified: false,
      licenceVerified: false,
    });

    const savedUser = await this._userRepository.create(user);
    return userMapper(savedUser);
  }
}
