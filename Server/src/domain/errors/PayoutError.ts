import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class InsufficientBalanceForWithDraw extends CustomError {
  constructor(
    message = 'Insufficient balance to withdraw amount,Minimum 100rs required'
  ) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class PayoutContactIdNotFound extends CustomError {
  constructor(message = 'Contact Id for payout not found') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
