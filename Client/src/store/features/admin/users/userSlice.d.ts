import type { User } from '@/types/auth';

export interface userState {
  loading: boolean;
  users: User[] | [];
  totalPages: number;
}
