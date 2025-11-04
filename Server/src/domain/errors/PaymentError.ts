import { ErrorMessages } from '../enums/ErrorMessage';
import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class PaymentInfoNotFound extends CustomError {
  constructor(message: string = ErrorMessages.PAYMENTINFO_NOT_FOUND) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class InvalidAmount extends CustomError {
  constructor(message: string = 'Invalid amount') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
