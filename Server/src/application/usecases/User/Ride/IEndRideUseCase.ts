import { EndRideReqDTO, EndRideResDTO } from '../../../../domain/dto/RideDTO';

export interface IEndRideUseCase {
  execute(data: EndRideReqDTO): Promise<EndRideResDTO>;
}
