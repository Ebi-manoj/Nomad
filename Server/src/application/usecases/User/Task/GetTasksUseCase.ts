import {
  GetTaskResponseDTO,
  GetTasksReqDTO,
} from '../../../../domain/dto/TaskDTO';
import { Unauthorized } from '../../../../domain/errors/CustomError';
import { RideNotFound } from '../../../../domain/errors/RideErrors';
import { GetTasksMapper } from '../../../mappers/TaskMapper';
import { IRideRepository } from '../../../repositories/IRideRepository';
import { ITaskRepository } from '../../../repositories/ITaskRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { IGetTasksUseCase } from './IGetTasksUseCase';

export class GetTasksUseCase implements IGetTasksUseCase {
  constructor(
    private readonly _taskRepository: ITaskRepository,
    private readonly _rideRepository: IRideRepository,
    private readonly _userRepository: IUserRepository
  ) {}
  async execute(data: GetTasksReqDTO): Promise<GetTaskResponseDTO[]> {
    const ride = await this._rideRepository.findById(data.rideId);
    if (!ride) throw new RideNotFound();

    if (ride.getRiderId() !== data.userId) throw new Unauthorized();
    const tasks = await this._taskRepository.findByRideId(data.rideId);
    const response = await Promise.all(
      tasks.map(async t => {
        const user = await this._userRepository.findById(t.getHikerId());
        if (!user) return null;
        return GetTasksMapper(t, user);
      })
    );
    return response.filter((r): r is GetTaskResponseDTO => r !== null);
  }
}
