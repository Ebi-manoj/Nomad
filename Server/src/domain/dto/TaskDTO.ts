import { TaskType, TaskStatus } from '../enums/Task';

export interface TaskResponseDTO {
  taskId: string;
  rideId: string;
  rideBookingId: string;
  hikerId: string;
  taskType: TaskType;
  location: GeoJSON.Point;
  address: string;
  priority: number;
  status: TaskStatus;
  completedAt?: Date;
  createdAt: Date;
}
