import { PaymentStatus } from '../enums/payment';

export interface PaymentResponseDTO {
  id: string;
  joinRequestId: string;
  hikerId: string;
  riderId: string;
  hikeId: string;
  rideId: string;
  amount: number;
  platformFee: number;
  status: PaymentStatus;
  paymentMethod?: string;
  stripePaymentId?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface HikerPaymentInfoRequestDTO {
  paymentId: string;
  userId: string;
}

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

export interface ConfirmHikerPaymentDTO {
  bookingId: string;
  bookingNumber: string;
  paymentId: string;
  seatsBooked: number;
  amount: number;
  platformFee: number;
}
