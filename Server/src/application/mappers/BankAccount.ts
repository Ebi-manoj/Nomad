import { BankAccountResponseDTO } from '../../domain/dto/bankAccountDTO';
import { BankAccount } from '../../domain/entities/BankAccount';

export class BankAccountMapper {
  static toJson(data: BankAccount): BankAccountResponseDTO {
    return {
      id: data.getId() as string,
      userId: data.getUserId(),
      accountNumber: data.getAccountNumber(),
      accountType: data.getAccountType(),
      bankName: data.getBankName(),
      fundAccountId: data.getFundAccountId(),
      ifscCode: data.getIfscCode(),
      accountHolderName: data.getAccountHolderName(),
      isVerified: data.getIsVerified(),
      isPrimary: data.getIsPrimary(),
      createdAt: data.getCreatedAt(),
      updatedAt: data.getUpdatedAt(),
    };
  }
}
