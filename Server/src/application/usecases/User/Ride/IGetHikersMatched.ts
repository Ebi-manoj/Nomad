import {
  GetHikersMatchedReqDTO,
  GetHikersMatchedResponseDTO,
} from '../../../../domain/dto/RideDTO';

export interface IGetHikerMatchedUseCase {
  execute(data: GetHikersMatchedReqDTO): Promise<GetHikersMatchedResponseDTO[]>;
}
