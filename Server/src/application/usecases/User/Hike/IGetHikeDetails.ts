import {
  GetHikeDetailsReqDTO,
  GetHikeDetailsResponseDTO,
} from '../../../../domain/dto/HikeDTO';

export interface IGetHikeDetailsUseCase {
  execute(data: GetHikeDetailsReqDTO): Promise<GetHikeDetailsResponseDTO>;
}
