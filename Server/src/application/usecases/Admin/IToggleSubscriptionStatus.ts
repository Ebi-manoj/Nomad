export interface IToggleSubscriptionStatusUseCase {
  execute(planId: string): Promise<{ planId: string; isActive: boolean }>;
}
