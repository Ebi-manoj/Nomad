export interface IGoogleClient {
  getAuthDetails(code: string): Promise<{ email: string; name: string } | null>;
}
