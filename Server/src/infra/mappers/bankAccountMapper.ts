import { Types } from 'mongoose';
import { BankAccount } from '../../domain/entities/BankAccount';
import { IBankAccountModel } from '../database/bankAccount.model';
import { IMapper } from './IMapper';

export const bankAccountMapper: IMapper<BankAccount, IBankAccountModel> = {
  toPersistence(domain: BankAccount): Partial<IBankAccountModel> {
    return {
      userId: new Types.ObjectId(domain.getUserId()),
      accountHolderName: domain.getAccountHolderName(),
      accountNumber: domain.getAccountNumber(),
      ifscCode: domain.getIfscCode(),
      bankName: domain.getBankName(),
      accountType: domain.getAccountType(),
      fundAccountId: domain.getFundAccountId() ?? null,
      isVerified: domain.getIsVerified(),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
    };
  },

  toDomain(doc: IBankAccountModel): BankAccount {
    return new BankAccount({
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      accountHolderName: doc.accountHolderName,
      accountNumber: doc.accountNumber,
      ifscCode: doc.ifscCode,
      bankName: doc.bankName,
      accountType: doc.accountType,
      fundAccountId: doc.fundAccountId ?? undefined,
      isVerified: doc.isVerified,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  },
};
