import type { SubscriptionTierType } from './subscription';

export interface GetHikersMatchedResponseDTO {
  user: {
    fullName: string;
    isVerified: boolean;
    rating: number;
    profilePic: string;
    subscriptionTier: SubscriptionTierType;
    badgeColor: string;
  };
  hikeDetails: {
    hikeId: string;
    pickupAddress: string;
    destinationAdress: string;
    pickupLocation: { lat: number; lng: number };
    dropoffLocation: { lat: number; lng: number };
    costShared: number;
    totalDistance: number;
    seatsRequested: number;
    status: string;
  };
}
