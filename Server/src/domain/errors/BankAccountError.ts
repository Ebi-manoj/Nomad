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
