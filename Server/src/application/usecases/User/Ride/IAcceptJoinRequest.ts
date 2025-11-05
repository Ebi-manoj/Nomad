import {
  AcceptJoinRequestDTO,
  AcceptJoinResponseDTO,
} from '../../../../domain/dto/RideMatch';

export interface IAcceptJoinRequestUseCase {
  execute(data: AcceptJoinRequestDTO): Promise<AcceptJoinResponseDTO>;
}
