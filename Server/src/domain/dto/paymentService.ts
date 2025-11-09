export interface paymentIntentRequestDTO {
  paymentId: string;
  amount: number;
  currency: string;
  customerId: string;
  metadata: Record<string, string>;
}

export interface paymentIntentResponseDTO {
  clientSecret: string;
  paymentIntentId: string;
}
