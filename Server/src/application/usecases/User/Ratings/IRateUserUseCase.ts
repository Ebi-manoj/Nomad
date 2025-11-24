import { RateUserReqDTO, RateUserResDTO } from '../../../../domain/dto/Reviews';

export interface IRateUserUseCase {
  execute(data: RateUserReqDTO): Promise<RateUserResDTO>;
}
