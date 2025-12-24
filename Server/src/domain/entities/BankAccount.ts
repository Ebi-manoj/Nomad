export type AccountType = 'savings' | 'current';

export interface BankAccountProps {
  id?: string;
  userId: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountType: AccountType;
  fundAccountId?: string;
  isVerified: boolean;
  isPrimary?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BankAccount {
  private readonly _id?: string;
  private readonly _userId: string;
  private _accountHolderName: string;
  private readonly _accountNumber: string;
  private readonly _ifscCode: string;
  private _bankName: string;
  private _accountType: AccountType;
  private readonly _fundAccountId?: string;
  private _isVerified: boolean;
  private _isPrimary: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;
  constructor(props: BankAccountProps) {
    this._id = props.id;
    this._userId = props.userId;
    this._accountHolderName = props.accountHolderName;
    this._accountNumber = props.accountNumber;
    this._ifscCode = props.ifscCode;
    this._bankName = props.bankName;
    this._accountType = props.accountType;
    this._fundAccountId = props.fundAccountId;
    this._isVerified = props.isVerified;
    this._isPrimary = props.isPrimary ?? false;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  getId() {
    return this._id;
  }
  getUserId() {
    return this._userId;
  }
  getAccountHolderName() {
    return this._accountHolderName;
  }
  getAccountNumber() {
    return this._accountNumber;
  }
  getIfscCode() {
    return this._ifscCode;
  }
  getBankName() {
    return this._bankName;
  }
  getAccountType() {
    return this._accountType;
  }
  getFundAccountId() {
    return this._fundAccountId;
  }
  getIsVerified() {
    return this._isVerified;
  }
  getIsPrimary() {
    return this._isPrimary;
  }
  getCreatedAt() {
    return this._createdAt;
  }
  getUpdatedAt() {
    return this._updatedAt;
  }

  setAccountHolderName(name: string) {
    this._accountHolderName = name;
    this._updatedAt = new Date();
  }
  setBankName(name: string) {
    this._bankName = name;
    this._updatedAt = new Date();
  }
  setAccountType(type: AccountType) {
    this._accountType = type;
    this._updatedAt = new Date();
  }
  setVerified(verified: boolean) {
    this._isVerified = verified;
    this._updatedAt = new Date();
  }
  setPrimary(primary: boolean) {
    this._isPrimary = primary;
    this._updatedAt = new Date();
  }
}
