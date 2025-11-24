import { GetRidesReqDTO, GetRidesResDTO } from '../../../../domain/dto/RideDTO';

export interface IGetAllRidesUseCase {
  execute(data: GetRidesReqDTO): Promise<GetRidesResDTO>;
}
