import {
  GetAllUsersRequestDTO,
  GetAllUsersResponseDTO,
} from '../../../domain/dto/userManagementDTO';

export interface IGetAllUsersUseCase {
  execute(data: GetAllUsersRequestDTO): Promise<GetAllUsersResponseDTO>;
}
