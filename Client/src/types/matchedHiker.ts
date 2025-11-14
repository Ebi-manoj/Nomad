export interface GetHikersMatchedResponseDTO {
  user: {
    fullName: string;
    isVerified: boolean;
    rating: number;
    profilePic: string;
  };
  hikeDetails: {
    hikeId: string;
    pickupAddress: string;
    destinationAdress: string;
    costShared: number;
    totalDistance: number;
    seatsRequested: number;
    status: string;
  };
}
