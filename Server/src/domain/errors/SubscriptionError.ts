import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class FreeTierNotRequiredPayment extends CustomError {
  constructor(message = 'Free tier plans not need payments') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class AlreadySubscribed extends CustomError {
  constructor(
    message = 'Already has an active subscription,Manage your subscription first'
  ) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class SubscriptionPlanNotFound extends CustomError {
  constructor(message = 'Subscription plan not found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class InvalidPlanTierOrBilling extends CustomError {
  constructor(message = 'Invalid plan tier or billing cycle') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class SubscriptionSessionNotFound extends CustomError {
  constructor(message = 'Subscription Session not found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
export class JoinRequestLimitExceeded extends CustomError {
  constructor(message = 'Join Request limit exceeded for this current ride') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
export class RideAcceptanceLimitExceeded extends CustomError {
  constructor(
    message = 'Ride accepetance limit exceeded for this current month'
  ) {
    super(HttpStatus.NOT_FOUND, message);
  }
}
export class CustomCostSharingNotEligible extends CustomError {
  constructor(message = 'Custom cost sharing not available for you') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
export class NoActiveSubscription extends CustomError {
  constructor(message = 'No active subscription found') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
