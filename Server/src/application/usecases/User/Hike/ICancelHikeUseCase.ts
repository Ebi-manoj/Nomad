import type { HikeStatus } from '../../../../domain/enums/Hike';

export interface CancelHikeReqDTO {
  userId: string;
  hikeId: string;
}

export interface CancelHikeResDTO {
  hikeId: string;
  status: HikeStatus;
}

export interface ICancelHikeUseCase {
  execute(data: CancelHikeReqDTO): Promise<CancelHikeResDTO>;
}
