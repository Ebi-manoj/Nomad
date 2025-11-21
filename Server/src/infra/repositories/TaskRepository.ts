import { MongoBaseRepository } from './BaseRepository';
import { ITaskRepository } from '../../application/repositories/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import { ITaskDocument, TaskModel } from '../database/Task.model';
import { taskMapper } from '../mappers/taskMapper';
import { TaskStatus } from '../../domain/enums/Task';

export class TaskRepository
  extends MongoBaseRepository<Task, ITaskDocument>
  implements ITaskRepository
{
  constructor() {
    super(TaskModel, taskMapper);
  }

  async findByRiderId(riderId: string, rideId?: string): Promise<Task[]> {
    const query: any = { riderId };
    if (rideId) {
      query.rideId = rideId;
    }
    const found = await this.model
      .find(query)
      .sort({ priority: -1, createdAt: 1 });
    return found.map(doc => this.mapper.toDomain(doc));
  }

  async findByRideBookingId(rideBookingId: string): Promise<Task[]> {
    const found = await this.model.find({ rideBookingId });
    return found.map(doc => this.mapper.toDomain(doc));
  }

  async findByRideId(rideId: string): Promise<Task[]> {
    const found = await this.model
      .find({ rideId })
      .sort({ priority: -1, createdAt: 1 });
    return found.map(doc => this.mapper.toDomain(doc));
  }

  async findPendingPickupTasks(
    riderId: string,
    rideId: string
  ): Promise<Task[]> {
    const found = await this.model
      .find({
        riderId,
        rideId,
        taskType: 'PICKUP',
        status: TaskStatus.PENDING,
      })
      .sort({ priority: -1, createdAt: 1 });
    return found.map(doc => this.mapper.toDomain(doc));
  }

  async findPendingDropoffTasks(
    riderId: string,
    rideId: string
  ): Promise<Task[]> {
    const found = await this.model
      .find({
        riderId,
        rideId,
        taskType: 'DROPOFF',
        status: TaskStatus.PENDING,
      })
      .sort({ priority: -1, createdAt: 1 });
    return found.map(doc => this.mapper.toDomain(doc));
  }

  async findPendingTasks(rideId: string): Promise<Task[]> {
    const result = await this.model.find({
      rideId,
      status: TaskStatus.PENDING,
    });
    return result.map(doc => this.mapper.toDomain(doc));
  }
}
