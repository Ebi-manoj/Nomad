import {
  RateUserReqDTO,
  RateUserResDTO,
  ReviewResponseDTO,
} from '../../../../domain/dto/Reviews';

export interface IRateUserUseCase {
  execute(data: RateUserReqDTO): Promise<ReviewResponseDTO>;
}
