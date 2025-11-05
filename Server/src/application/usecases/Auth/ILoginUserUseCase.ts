import {
  LoginUserRequestDTO,
  LoginuserResponseDTO,
} from '../../../domain/dto/authDTO';

export interface ILoginUserUsecase {
  execute(data: LoginUserRequestDTO): Promise<LoginuserResponseDTO>;
}
