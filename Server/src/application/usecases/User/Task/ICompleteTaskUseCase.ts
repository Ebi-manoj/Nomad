import {
  CompleteTaskReqDTO,
  CompleteTaskResponseDTO,
} from '../../../../domain/dto/TaskDTO';

export interface ICompleteTaskUseCase {
  execute(data: CompleteTaskReqDTO): Promise<CompleteTaskResponseDTO>;
}
