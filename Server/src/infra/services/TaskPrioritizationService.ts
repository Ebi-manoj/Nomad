import { ITaskPrioritizationService } from '../../application/services/ITaskPrioritizationService';
import { Task } from '../../domain/entities/Task';
import { Data, IGoogleApi } from '../../application/providers/IGoogleApi';

export class TaskPrioritizationService implements ITaskPrioritizationService {
  constructor(private readonly googleApi: IGoogleApi) {}

  async prioritizeTasks(
    tasks: Task[],
    currentLocation: Data,
    rideRoute: GeoJSON.LineString
  ): Promise<Task[]> {
    const tasksWithPriority = await Promise.all(
      tasks.map(async task => {
        const priority = await this.calculatePriority(
          task,
          currentLocation,
          rideRoute
        );
        task.setPriority(priority);
        return task;
      })
    );

    // Sort by priority
    return tasksWithPriority.sort((a, b) => {
      if (b.getPriority() !== a.getPriority()) {
        return b.getPriority() - a.getPriority();
      }
      return a.getCreatedAt().getTime() - b.getCreatedAt().getTime();
    });
  }

  async calculatePriority(
    task: Task,
    currentLocation: Data,
    rideRoute: GeoJSON.LineString
  ): Promise<number> {
    const taskLocation: Data = {
      lat: task.getLocation().coordinates[1],
      lng: task.getLocation().coordinates[0],
    };

    // Calculate distance from current location to task location
    const { distance } = await this.googleApi.getDistance(
      currentLocation,
      taskLocation
    );

    let priority = 1000;

    // Inverse distance priority (closer = higher priority)
    priority += Math.max(0, 1000 - distance * 10);

    return Math.round(priority);
  }
}
