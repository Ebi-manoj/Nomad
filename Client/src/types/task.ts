export type TaskType = 'PICKUP' | 'DROPOFF';
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id: string;
  hikerId: string;
  taskType: TaskType;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  address: string;
  priority: number;
  status: TaskStatus;
  user: {
    fullName: string;
    rating: number;
    profilePic: string;
    isVerified: boolean;
  };
  estimatedTime?: string;
  otp?: string;
}
