export interface IWithDrawMoneyUseCase {
  execute(userId: string): Promise<void>;
}
