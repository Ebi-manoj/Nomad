import type { AdminSubscriptionPlanDTO } from '@/types/adminSubscription';

export interface AdminSubscriptionPlansState {
  plans: AdminSubscriptionPlanDTO[];
  loading: boolean;
  error: string;
}
