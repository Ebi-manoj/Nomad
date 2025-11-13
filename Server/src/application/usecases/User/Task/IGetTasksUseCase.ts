import {
  GetTaskResponseDTO,
  GetTasksReqDTO,
} from '../../../../domain/dto/TaskDTO';

export interface IGetTasksUseCase {
  execute(data: GetTasksReqDTO): Promise<GetTaskResponseDTO[]>;
}
