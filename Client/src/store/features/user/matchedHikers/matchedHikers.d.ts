import type { GetHikersMatchedResponseDTO } from '@/types/matchedHiker';

export interface MatchedHikersState {
  hikers: GetHikersMatchedResponseDTO[];
  loading: boolean;
  error: string;
}
