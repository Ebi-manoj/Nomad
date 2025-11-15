import type { Task } from '@/types/task';

export interface RiderTasksState {
  tasks: Task[];
  loading: boolean;
  error: string;
}
