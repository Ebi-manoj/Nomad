export interface RideBookingResponseDTO {
  rideBooking: {
    bookingId: string;
    rideId: string;
    hikeId: string;
    riderId: string;
    hikerId: string;
    seatsBooked: number;
    amount: number;
    platformFee: number;
    pickupLocation: [number, number];
    dropoffLocation: [number, number];
    status: string;
  };
  rider: {
    name: string;
    rating: number;
    vehicleNumber: string;
    vehicleModel: string;
    currentLocation: { lat: number; lng: number };
  };
  rideDetails: {
    pickupAddress: string;
    dropoffAddress: string;
    departure: number;
    distance: number;
    duration: number;
  };
}

export interface RideBookingState {
  booking: RideBookingResponseDTO | null;
  loading: boolean;
  error: string;
}
