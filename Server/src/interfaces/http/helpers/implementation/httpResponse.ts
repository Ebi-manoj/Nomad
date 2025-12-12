import { IhttpResponse } from '../IHttpResponse';
import { ApiDTO } from './apiResponse';

export class HttpResponse implements IhttpResponse {
  statusCode: number;
  body: ApiDTO<any>;

  constructor(statusCode: number, body: any) {
    this.statusCode = statusCode;
    this.body = body;
  }
}
