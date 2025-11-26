import type { User } from '@/types/auth';

export type AdminSosStatus = 'OPEN' | 'RESOLVED';
export type AdminSosInitiator = 'HIKER' | 'RIDER';

export interface AdminSosLog {
  id: string;
  userId: string;
  rideId: string | null;
  bookingId: string | null;
  location: {
    lat: number;
    lng: number;
  };
  initiatedBy: AdminSosInitiator;
  status: AdminSosStatus;
  triggeredAt: string;
  initiaterDetails: User;
}

export interface AdminSosState {
  loading: boolean;
  logs: AdminSosLog[];
  totalCount: number;
}

export interface FetchAdminSosQuery {
  page: number;
  status?: string;
}
