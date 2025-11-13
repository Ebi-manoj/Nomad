export type TaskType = 'PICKUP' | 'DROPOFF';
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id: string;
  hikerId: string;
  taskType: TaskType;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
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

export interface ConfirmedHiker {
  id: string;
  bookingId: string;
  hiker: {
    id: string;
    fullName: string;
    profilePicture?: string;
    phone?: string;
    rating?: number;
  };
  pickupLocation: {
    address: string;
    coordinates: [number, number];
  };
  dropoffLocation: {
    address: string;
    coordinates: [number, number];
  };
  seatsBooked: number;
  amount: number;
  status: 'confirmed' | 'picked_up' | 'dropped_off';
  confirmedAt: string;
}
