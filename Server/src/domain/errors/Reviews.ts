import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class AlreadyReviewed extends CustomError {
  constructor(message = 'This booking has already reviewed') {
    super(HttpStatus.CONFLICT, message);
  }
}
