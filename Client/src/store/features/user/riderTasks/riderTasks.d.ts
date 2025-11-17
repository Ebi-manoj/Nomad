import type { Task } from '@/types/task';

export interface RiderTasksState {
  tasks: Task[];
  loading: boolean;
  error: string;
}

export interface CompleteTaskReqDTO {
  taskId: string;
  otp?: string;
}

export interface CompleteTaskResponseDTO {
  taskId: string;
  status: TaskStatus;
}
