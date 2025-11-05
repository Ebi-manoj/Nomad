import { UpdateLocationDTO } from '../../../../domain/dto/RideDTO';

export interface IUpdateLocationUseCase {
  execute(data: UpdateLocationDTO): Promise<void>;
}
