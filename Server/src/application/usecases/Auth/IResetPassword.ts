import { ResetPasswordRequestDTO } from '../../../domain/dto/authDTO';

export interface IResetPasswordUseCase {
  execute(data: ResetPasswordRequestDTO): Promise<{ message: string }>;
}
