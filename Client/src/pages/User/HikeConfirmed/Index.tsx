import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Clock,
  Navigation,
  Phone,
  MessageCircle,
  User,
  Car,
  Calendar,
} from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getRideBookingThunk } from '@/store/features/user/rideBooking/rideBooking.thunk';
import type { RootState } from '@/store/store';
import { timeFormater } from '@/utils/dateFormater';
import { HikeStartedMap } from './HikeMap';
import { latlangFormat } from '@/utils/LatLangFormater';

export const HikeStartedPage = () => {
  const dispatch = useAppDispatch();
  const { bookingId } = useParams();
  const { booking, loading } = useSelector(
    (state: RootState) => state.rideBooking
  );
  const [departure, setDeparture] = useState('');
  const [estimation, setEstimation] = useState('');
  useEffect(() => {
    if (!booking) return;
    setDeparture(timeFormater(rideDetails.departure));
    setEstimation(timeFormater(rideDetails.duration + rideDetails.departure));
  }, [booking]);

  useEffect(() => {
    if (!bookingId) return;
    dispatch(getRideBookingThunk(bookingId));
  }, [bookingId, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading ride details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No ride details found.</p>
      </div>
    );
  }

  const { rideBooking, rider, rideDetails } = booking;
  const riderLocation = rider.currentLocation;
  const hikerPickup = latlangFormat(rideBooking.pickupLocation, false);
  const hikerDestination = latlangFormat(rideBooking.dropoffLocation, false);
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-semibold">Ride in Progress</h1>
            <p className="text-sm text-gray-500">
              Booking ID: {rideBooking.rideId}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
            {rideBooking.status}
          </span>
          <button className="cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm rounded-full transition">
            Cancel Ride
          </button>
        </div>
      </div>

      <div className="w-full mx-auto p-4 grid md:grid-cols-2 gap-4">
        {/* Left Panel */}
        <div className="space-y-4">
          {/* Rider Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Ride Details
            </h2>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {rider.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{rider.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    {rider.rating}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Vehicle */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
              <Car className="w-6 h-6 text-gray-600" />
              <div>
                <p className="font-semibold">{rider.vehicleModel}</p>
                <p className="text-sm text-gray-600">{rider.vehicleNumber}</p>
              </div>
            </div>

            {/* Pickup & Drop */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-0.5 h-16 bg-gray-300"></div>
                </div>
                <div className="flex-1 pt-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-green-600">
                      PICKUP
                    </span>
                    <span className="text-xs text-gray-500">
                      Rider is on the way
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {rideDetails.pickupAddress}
                  </p>
                  <p className="text-sm text-gray-500">
                    Departure: {departure}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex-1 pt-0">
                  <span className="text-sm font-medium text-red-600 block mb-1">
                    DROPOFF
                  </span>
                  <p className="font-semibold text-gray-900">
                    {rideDetails.dropoffAddress}
                  </p>
                  <p className="text-sm text-gray-500">Est. {estimation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">Trip Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="font-semibold">
                    {Math.round(rideDetails.duration)} mins
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Navigation className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Distance</p>
                  <p className="font-semibold">{rideDetails.distance} km</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <User className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Seats</p>
                  <p className="font-semibold">{rideBooking.seatsBooked}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600">Amount</p>
                  <p className="font-semibold">₹{rideBooking.amount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="space-y-4">
          <HikeStartedMap
            riderLocation={riderLocation}
            pickup={hikerPickup}
            destination={hikerDestination}
          />
        </div>
      </div>
    </div>
  );
};
