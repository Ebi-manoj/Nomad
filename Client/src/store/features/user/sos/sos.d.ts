import type { SosContactDTO } from '@/types/sos';

export interface SosState {
  contacts: SosContactDTO[];
  loading: boolean;
  error: string;
}
