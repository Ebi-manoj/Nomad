import { HikeResponseDTO } from './HikeDTO';

export interface GetAllHikesResDTO {
  hikes: HikeResponseDTO[];
  total: number;
}
