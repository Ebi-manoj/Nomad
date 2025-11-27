import { WalletDetailsDTO } from '../../../../domain/dto/WalletDTO';

export interface IGetWalletDetailsUseCase {
  execute(
    userId: string,
    page: number,
  ): Promise<WalletDetailsDTO>;
}
