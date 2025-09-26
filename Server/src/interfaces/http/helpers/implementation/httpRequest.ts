import { IhttpRequest } from '../IhttpRequest';

export class HttpRequest implements IhttpRequest {
  header?: unknown;
  body?: unknown;
  query?: unknown;
  path?: unknown;

  constructor(init?: HttpRequest) {
    Object.assign(this, init);
  }
}
