export interface IDeleteSubscriptionPlanUseCase {
  execute(planId: string): Promise<{ planId: string; success: boolean }>;
}
