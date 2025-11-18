import {
  MarkDroppOffReqDTO,
  MarkDroppOffResDTO,
} from '../../../../domain/dto/TaskDTO';

export interface IMarkDropOffUseCase {
  execute(data: MarkDroppOffReqDTO): Promise<MarkDroppOffResDTO>;
}
