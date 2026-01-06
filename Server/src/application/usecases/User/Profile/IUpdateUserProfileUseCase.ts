import type { UpdateUserProfileReqDTO, UpdateUserProfileResDTO } from '../../../../domain/dto/userProfileDTO';

export interface IUpdateUserProfileUseCase {
  execute(userId: string, dto: UpdateUserProfileReqDTO): Promise<UpdateUserProfileResDTO>;
}
