import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class RideBookingNotFound extends CustomError {
  constructor(message = 'Ride Booking not Found') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class FailToFetchLiveUpdates extends CustomError {
  constructor(message = 'Fail to fetch live updates') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
