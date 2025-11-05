import { RideMatchResponseDTO } from '../../../../domain/dto/RideMatch';

export interface IFindMatchRideUseCase {
  execute(hikeId: string): Promise<RideMatchResponseDTO[]>;
}
