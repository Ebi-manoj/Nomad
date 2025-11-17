import { CompleteTaskReqDTO } from '../../../../domain/dto/TaskDTO';

export interface ICompleteTaskUseCase {
  execute(data: CompleteTaskReqDTO): Promise<{ message: string }>;
}
