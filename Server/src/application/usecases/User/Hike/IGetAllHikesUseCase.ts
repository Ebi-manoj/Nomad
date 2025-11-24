import {
  GetHikeDetailsResponseDTO,
  GetHikesReqDTO,
  GetHikesResDTO,
  HikeResponseDTO,
} from '../../../../domain/dto/HikeDTO';

export interface IGetAllHikesUseCase {
  execute(data: GetHikesReqDTO): Promise<GetHikesResDTO>;
}
