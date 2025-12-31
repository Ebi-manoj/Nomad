import { ErrorMessages } from '../enums/ErrorMessage';
import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class HikeNotFound extends CustomError {
  constructor(message = ErrorMessages.HIKE_NOT_FOUND) {
    super(HttpStatus.NOT_FOUND, message);
  }
}
export class SeatsNotAvailable extends CustomError {
  constructor(message = ErrorMessages.SEATS_NOT_AVAILABLE) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class HasPendingRequest extends CustomError {
  constructor(message = ErrorMessages.HAS_PENDING_REQUESTS) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class ActiveHikeRequiredToCancel extends CustomError {
  constructor(message = 'Only active hikes can be cancelled') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class ConfirmedHikeCannotCancel extends CustomError {
  constructor(message = 'Hike already confirmed. Use booking cancellation.') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
