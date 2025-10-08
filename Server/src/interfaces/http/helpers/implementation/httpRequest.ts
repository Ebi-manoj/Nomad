import { unknown } from 'zod';
import { IhttpRequest } from '../IHttpRequest';

export class HttpRequest implements IhttpRequest {
  header?: unknown;
  body?: unknown;
  query?: unknown;
  path?: unknown;
  cookies?: unknown;

  constructor(init?: HttpRequest) {
    Object.assign(this, init);
  }
}
