import {
  DeclineJoinRequestDTO,
  DeclineJoinResponseDTO,
} from '../../../../domain/dto/RideMatch';

export interface IDeclineJoinRequestUseCase {
  execute(data: DeclineJoinRequestDTO): Promise<DeclineJoinResponseDTO>;
}
