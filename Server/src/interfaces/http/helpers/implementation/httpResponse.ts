import { IhttpResponse } from '../IHttpResponse';
import { ApiResponse } from './apiResponse';

export class HttpResponse implements IhttpResponse {
  statusCode: number;
  body: ApiResponse<any>;

  constructor(statusCode: number, body: any) {
    this.statusCode = statusCode;
    this.body = body;
  }
}
