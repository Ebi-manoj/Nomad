export interface IHandleSubscriptionWebhookUseCase {
  execute(payload: Buffer | string, signature?: string): Promise<void>;
}
