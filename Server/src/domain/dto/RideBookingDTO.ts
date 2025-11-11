export interface RideBookingRequestDTO {
  bookingId: string;
  userId: string;
}

export interface RideBookingResponseDTO {
  rideBooking: {
    rideId: string;
    hikeId: string;
    riderId: string;
    hikerId: string;
    seatsBooked: number;
    amount: number;
    platformFee: number;
    pickupLocation: { coordinates: number[] };
    dropoffLocation: { coordinates: number[] };
    status: string;
  };
  rider: {
    name: string;
    rating: number;
    vehicleNumber: string;
    vehicleModel: string;
  };
  rideDetails: {
    pickupAddress: string;
    dropoffAddress: string;
    departure: number;
    distance: number;
    duration: number;
  };
}
