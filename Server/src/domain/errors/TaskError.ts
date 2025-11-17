import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class TaskNotFound extends CustomError {
  constructor(message = 'Task not Found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
export class TaskOTPNotFound extends CustomError {
  constructor(message = 'Task OTP not Found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
