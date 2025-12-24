import {
  CreateFundAccountDTO,
  CreateFundAccountResDTO,
  CreatePaymentContactDTO,
  CreatePaymentContactResDTO,
  CreatePayoutDTO,
  PayoutResponse,
} from '../../domain/dto/Payouts';

export interface IPayoutService {
  createContact(
    data: CreatePaymentContactDTO
  ): Promise<CreatePaymentContactResDTO>;
  createFundAccount(
    data: CreateFundAccountDTO
  ): Promise<CreateFundAccountResDTO>;
  createPayout(data: CreatePayoutDTO): Promise<PayoutResponse>;
}
