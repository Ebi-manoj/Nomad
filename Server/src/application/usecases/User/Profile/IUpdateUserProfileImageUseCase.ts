import type { UserResponseDTO } from '../../../../domain/dto/authDTO';

export interface IUpdateUserProfileImageUseCase {
  execute(userId: string, fileURL: string): Promise<UserResponseDTO>;
}
