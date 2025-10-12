export interface IhttpRequest {
  header?: unknown;
  body?: unknown;
  query?: unknown;
  path?: unknown;
  cookies?: unknown;
  user?: { id: string; role: string };
}
