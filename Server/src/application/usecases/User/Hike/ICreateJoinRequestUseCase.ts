import {
  CreateJoinRequestDTO,
  JoinRequestResponseDTO,
} from '../../../../domain/dto/HikeDTO';

export interface ICreateJoinRequestUseCase {
  execute(data: CreateJoinRequestDTO): Promise<JoinRequestResponseDTO>;
}
