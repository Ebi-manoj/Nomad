export interface HikerPaymentInfoResponseDTO {
  rider: {
    fullName: string;
    profilePic: string;
    rating: number;
  };
  route: {
    distanceAwayfromPickup: number;
    distanceAwayfromDestination: number;
  };
  amount: number;
  platformFee: number;
  totalAmount: number;
  expiresAt: Date;
}

export interface paymentIntentRequestDTO {
  paymentId: string;
  currency: string;
  amount: number;
  metadata: Record<string, string>;
}

export interface paymentIntentResponseDTO {
  clientSecret: string;
  paymentIntentId: string;
}
