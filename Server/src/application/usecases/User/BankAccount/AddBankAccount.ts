import {
  AddBankAccountDTO,
  BankAccountResponseDTO,
} from '../../../../domain/dto/bankAccountDTO';
import { AccountType, ContactType } from '../../../../domain/dto/Payouts';
import { BankAccount } from '../../../../domain/entities/BankAccount';
import { User } from '../../../../domain/entities/User';
import { IFSC_VALIDATE_URL } from '../../../../domain/enums/Payout';
import {
  InvalidIFSCCode,
  NotVerifiedForBankAccount,
} from '../../../../domain/errors/BankAccountError';
import { UserNotFound } from '../../../../domain/errors/CustomError';
import { BankAccountMapper } from '../../../mappers/BankAccount';
import { IPayoutService } from '../../../providers/IPayoutService';
import { IBankAccountRepository } from '../../../repositories/IBankAccountRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { IAddBankAccountUseCase } from './IAddBankAccount';

export class AddBankAccountUseCase implements IAddBankAccountUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _bankAccountRepository: IBankAccountRepository,
    private readonly _payoutService: IPayoutService
  ) {}

  async execute(data: AddBankAccountDTO): Promise<BankAccountResponseDTO> {
    const user = await this._userRepository.findById(data.userId);
    if (!user) throw new UserNotFound();

    if (!user.getIsVerifed()) throw new NotVerifiedForBankAccount();

    const bankDetails = await this._validateIFSC(data.ifscCode);

    const isExisiting = await this._bankAccountRepository.findByAccountNumber(
      data.accountNumber
    );
    if (isExisiting) return BankAccountMapper.toJson(isExisiting);

    const contactId = await this._getUserPayoutContactId(user);

    const fundAccount = await this._payoutService.createFundAccount({
      contactId,
      accountType: AccountType.BANK_ACCOUNT,
      bankAccount: {
        name: data.accountHolderName,
        ifsc: data.ifscCode,
        accountNumber: data.accountNumber,
      },
    });

    const bankAccount = new BankAccount({
      userId: data.userId,
      accountHolderName: data.accountHolderName,
      accountNumber: data.accountNumber,
      ifscCode: data.ifscCode,
      bankName: bankDetails.bankName,
      accountType: data.accountType,
      fundAccountId: fundAccount.id,
      isVerified: true,
    });

    const created = await this._bankAccountRepository.create(bankAccount);
    return BankAccountMapper.toJson(created);
  }

  private async _getUserPayoutContactId(user: User): Promise<string> {
    let contactId = user.getPayoutContactId();
    if (!contactId) {
      const contact = await this._payoutService.createContact({
        name: user.getFullName(),
        email: user.getEmail(),
        contact: user.getMobile() ?? undefined,
        type: ContactType.CUSTOMER,
      });
      contactId = contact.id;
      user.setPayoutContactId(contactId);
      await this._userRepository.update(user.getId() as string, user);
    }
    return contactId;
  }

  private async _validateIFSC(ifsc: string): Promise<{ bankName: string }> {
    const response = await fetch(`${IFSC_VALIDATE_URL}/${ifsc}`);
    if (!response.ok) throw new InvalidIFSCCode();

    const data = await response.json();
    return { bankName: data.BANK };
  }
}
