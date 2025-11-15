import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getRideBookingThunk } from '@/store/features/user/rideBooking/rideBooking.thunk';
import type { RootState } from '@/store/store';
import { HikeStartedMap } from './HikeMap';
import { latlangFormat } from '@/utils/LatLangFormater';
import { BookingSection } from './BookingSection';
import type { ChatInterfaceProps } from '@/types/chat';
import ChatInterface from '../../../components/ChatInterface';

export const HikeStartedPage = () => {
  const [showChat, setShowChat] = useState<ChatInterfaceProps | null>(null);
  const dispatch = useAppDispatch();
  const { bookingId } = useParams();
  const { booking, loading } = useSelector(
    (state: RootState) => state.rideBooking
  );

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

  const { rideBooking, rider } = booking;
  const riderLocation = rider.currentLocation;
  const hikerPickup = latlangFormat(rideBooking.pickupLocation, false);
  const hikerDestination = latlangFormat(rideBooking.dropoffLocation, false);

  const onChatBack = () => {
    setShowChat(null);
  };

  const handleChatClick = () => {
    setShowChat({
      onBack: onChatBack,
      role: 'hiker',
      user: {
        name: rider.name,
        profilePic: '',
        verified: false,
        socketId: rideBooking.hikeId,
        rating: rider.rating,
      },
    });
  };

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

      <div className="w-full mx-auto p-4 grid md:grid-cols-2 gap-4 items-stretch min-h-[80vh]">
        {/* Left Panel */}
        {!showChat && (
          <BookingSection booking={booking} onChatClick={handleChatClick} />
        )}
        {showChat && (
          <div className="space-y-4 h-full">
            <ChatInterface
              onBack={onChatBack}
              role={showChat.role}
              user={showChat.user}
            />
          </div>
        )}

        {/* Map Section */}
        <div className="space-y-4 h-full">
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
