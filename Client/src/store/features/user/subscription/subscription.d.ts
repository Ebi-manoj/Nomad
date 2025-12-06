import type { SubscriptionDTO } from '@/types/subscription';

export interface SubscriptionState {
  data: SubscriptionDTO | null;
  loading: boolean;
  error: '';
}
