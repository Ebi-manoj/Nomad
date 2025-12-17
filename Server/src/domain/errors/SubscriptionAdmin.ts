import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class SubscriptionPlanExist extends CustomError {
  constructor(message = 'Subscription plan with this tier already exist') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class SubscriptionPlanNotFound extends CustomError {
  constructor(message = 'Subscription Plan not Found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
