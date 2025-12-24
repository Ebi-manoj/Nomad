export interface ISetPrimaryBankAccountUseCase {
  execute(userId: string, accountId: string): Promise<void>;
}
