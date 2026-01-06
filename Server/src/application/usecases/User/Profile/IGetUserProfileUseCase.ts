import { GetUserProfileResDTO } from '../../../../domain/dto/userProfileDTO';

export interface IGetUserProfileUseCase {
  execute(userId: string): Promise<GetUserProfileResDTO>;
}
