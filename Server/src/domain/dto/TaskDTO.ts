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

export interface GetTasksReqDTO {
  rideId: string;
  userId: string;
}

export interface GetTaskResponseDTO {
  id: string;
  hikerId: string;
  taskType: TaskType;
  location: GeoJSON.Point;
  address: string;
  priority: number;
  status: TaskStatus;
  user: {
    fullName: string;
    rating: number;
    profilePic: string;
    isVerified: boolean;
  };
}

export interface CompleteTaskReqDTO {
  otp?: string;
  taskId: string;
  userId: string;
}
export interface CompleteTaskResponseDTO {
  taskId: string;
  status: TaskStatus;
}

export interface MarkDroppOffReqDTO {
  bookingId: string;
  userId: string;
}
export interface MarkDroppOffResDTO {
  bookingId: string;
  message: string;
}
