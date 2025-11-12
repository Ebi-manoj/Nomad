import { Task } from '../../domain/entities/Task';
import { Data } from '../providers/IGoogleApi';

export interface ITaskPrioritizationService {
  prioritizeTasks(
    tasks: Task[],
    currentLocation: Data,
    rideRoute: GeoJSON.LineString
  ): Promise<Task[]>;
  calculatePriority(
    task: Task,
    currentLocation: Data,
    rideRoute: GeoJSON.LineString
  ): Promise<number>;
}
