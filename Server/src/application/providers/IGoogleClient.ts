export interface IGoogleClient {
  getAuthDetails(code: string): Promise<object | null>;
}
