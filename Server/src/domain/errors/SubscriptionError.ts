import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class FreeTierNotRequiredPayment extends CustomError {
  constructor(message = 'Free tier plans not need payments') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class InvalidPlanTierOrBilling extends CustomError {
  constructor(message = 'Invalid plan tier or billing cycle') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
