import { JoinRequestResponseDTO } from '../../../../domain/dto/HikeDTO';

export interface IGetPendingRequestUseCase {
  execute(rideId: string): Promise<JoinRequestResponseDTO[]>;
}
