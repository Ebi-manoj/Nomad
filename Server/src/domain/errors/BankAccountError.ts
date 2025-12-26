import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class NotVerifiedForBankAccount extends CustomError {
  constructor(message = 'Verifiy your details before adding bank account') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class InvalidIFSCCode extends CustomError {
  constructor(message = 'Invalid IFSC code') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class MaximumAccountLimitReached extends CustomError {
  constructor(message = 'Maximum bank account limit reached') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class PrimaryAccountNotFound extends CustomError {
  constructor(message = 'Primary bank account not found') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class FundAccountIdNotFound extends CustomError {
  constructor(message = 'Fund account id not found') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class AlreadyExisitingBankAccount extends CustomError {
  constructor(message = 'Already exisiting bank account') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
