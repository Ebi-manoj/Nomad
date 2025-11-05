import { CreateHikeDTO, HikeResponseDTO } from '../../../../domain/dto/HikeDTO';

export interface ICreateHikeUseCase {
  execute(data: CreateHikeDTO): Promise<HikeResponseDTO>;
}
