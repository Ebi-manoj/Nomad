import {
  GetHikesReqDTO,
  GetHikesResDTO,
} from '../../../../domain/dto/HikeDTO';

export interface IGetAllHikesUseCase {
  execute(data: GetHikesReqDTO): Promise<GetHikesResDTO>;
}
