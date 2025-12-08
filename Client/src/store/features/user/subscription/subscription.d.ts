import type {
  SubscriptionDTO,
  GetSubscriptionDetailsResDTO,
} from '@/types/subscription';

export interface SubscriptionState {
  data: GetSubscriptionDetailsResDTO | null;
  loading: boolean;
  error: string;
}
