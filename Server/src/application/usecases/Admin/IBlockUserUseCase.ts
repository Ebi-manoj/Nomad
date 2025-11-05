import { UserResponseDTO } from '../../../domain/dto/authDTO';

export interface IBlockUserUseCase {
  execute(id: string): Promise<UserResponseDTO>;
}
