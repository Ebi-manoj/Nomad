import {
  RegisterUserRequestDTO,
  UserResponseDTO,
} from '../../../domain/dto/authDTO';

export interface IRegisterUserUseCase {
  execute(data: RegisterUserRequestDTO): Promise<UserResponseDTO>;
}
