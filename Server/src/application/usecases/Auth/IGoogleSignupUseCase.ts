import { LoginuserResponseDTO } from '../../../domain/dto/authDTO';

export interface IGoogleSignupUseCase {
  execute(data: { code: string }): Promise<LoginuserResponseDTO>;
}
