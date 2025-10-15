import { Request } from 'express';
import { HttpRequest } from '../http/helpers/implementation/httpRequest';
import { HttpResponse } from '../http/helpers/implementation/httpResponse';

export async function expressAdapter(
  req: Request,
  controllerMethod: (httpRequest: HttpRequest) => Promise<HttpResponse>
): Promise<HttpResponse> {
  const httpRequest: HttpRequest = new HttpRequest({
    header: req.headers,
    body: req.body,
    path: req.params,
    query: req.query,
    cookies: req.cookies,
    user: req.user,
  });
  const httpResponse = await controllerMethod(httpRequest);

  return httpResponse;
}
