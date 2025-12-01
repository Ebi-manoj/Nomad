import type { HikeResponseDTO } from '@/store/features/user/hike/hike';
import type { User } from '@/types/auth';

export interface AdminHikeResponseDTO extends HikeResponseDTO {
  user: User;
}

export interface GetAdminHikesResDTO {
  hikes: AdminHikeResponseDTO[];
  total: number;
  hikeMetrics: {
    completed: number;
    active: number;
    cancelled: number;
  };
}

export interface AdminHikeRiderVehicle {
  model: string;
  type: string;
  number: string;
}

export interface AdminHikeRider extends User {
  vehicle: AdminHikeRiderVehicle;
}

export interface AdminHikeBooking {
  bookingId: string;
  bookingNumber: string;
  refundAmount?: number;
  rideId: string;
  seatsBooked: number;
  amount: number;
  platformFee: number;
  status: string;
  createdAt: Date | string;
}

export interface AdminHikePayment {
  id: string;
  amount: number;
  platformFee: number;
  status: string;
  stripePaymentId?: string;
  createdAt: Date | string;
}

export interface AdminHikeDetailsResDTO extends HikeResponseDTO {
  user: User;
  rider?: AdminHikeRider;
  booking?: AdminHikeBooking;
  payment?: AdminHikePayment;
}
