import {
  GetRideDetailsReqDTO,
  GetRideDetailsResDTO,
} from '../../../../domain/dto/RideDTO';

export interface IGetRideDetailsUseCase {
  execute(data: GetRideDetailsReqDTO): Promise<GetRideDetailsResDTO>;
}
