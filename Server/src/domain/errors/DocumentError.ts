import { ErrorMessages } from '../enums/ErrorMessage';
import { HttpStatus } from '../enums/HttpStatusCode';
import { CustomError } from './CustomError';

export class DocumentNotFound extends CustomError {
  constructor(message = ErrorMessages.DOCUMENT_NOT_FOUND) {
    super(HttpStatus.NOT_FOUND, message);
  }
}
