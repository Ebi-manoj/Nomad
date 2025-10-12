import { IhttpRequest } from '../IHttpRequest';

export class HttpRequest implements IhttpRequest {
  header?: unknown;
  body?: unknown;
  query?: unknown;
  path?: unknown;
  cookies?: unknown;
  user?: { id: string; role: string };

  constructor(init?: IhttpRequest) {
    Object.assign(this, init);
  }
}
