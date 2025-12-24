export interface IDeleteBankAccountUseCase {
  execute(userId: string, accountId: string): Promise<void>;
}
