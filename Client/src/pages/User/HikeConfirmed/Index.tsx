import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  getBookingLiveThunk,
  getRideBookingThunk,
} from '@/store/features/user/rideBooking/rideBooking.thunk';
import type { RootState } from '@/store/store';
import { HikeStartedMap } from './HikeMap';
import { latlangFormat } from '@/utils/LatLangFormater';
import { BookingSection } from './BookingSection';
import type { ChatInterfaceProps } from '@/types/chat';
import ChatInterface from '../../../components/ChatInterface';
import { AlertCircle, CheckCircle, Loader2, RotateCw, Car } from 'lucide-react';
import { cancelBooking, markDropOff, reqCancel } from '@/api/rideBooking';
import { handleApiError } from '@/utils/HandleApiError';
import { GenericModal } from '@/components/GenericModel';
import type { ReqCancelBookingResDTO } from '@/types/hike';
import { RefundModel } from './RefundModel';
import { SosButton } from '@/components/SosButton';
import type { RouteDeviationResDTO, TriggerSosHikerDTO } from '@/types/sos';
import { triggerSosHiker } from '@/api/sos';
import { toast } from 'sonner';
import { hikerSocket } from '@/config/socket';
import DeviationAlertModal from './DeviationModel';
import { setBookingStatus } from '@/store/features/user/rideBooking/rideBookingSlice';

export const HikeStartedPage = () => {
  const [currLocation, setCurrLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showChat, setShowChat] = useState<ChatInterfaceProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reqCancelLoading, setReqCancelLoading] = useState(false);
  const [dropoffLoading, setDropoffLoading] = useState(false);
  const [refundData, setRefundData] = useState<ReqCancelBookingResDTO | null>(
    null
  );
  const [deviationAlert, setDeviationAlert] = useState<{
    isOpen: boolean;
    data: RouteDeviationResDTO | null;
    message: string;
  }>({
    isOpen: false,
    data: null,
    message: '',
  });
  const dispatch = useAppDispatch();
  const { bookingId } = useParams();
  const { booking, loading } = useSelector(
    (state: RootState) => state.rideBooking
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (!bookingId) return;
    dispatch(getRideBookingThunk(bookingId));
  }, [bookingId, dispatch]);

  useEffect(() => {
    if (!booking) return;
    const status = booking.rideBooking.status;
    if (status !== 'CONFIRMED' && status !== 'PICKED UP') {
      navigate(`/hike/${booking.rideBooking.hikeId}`, { replace: true });
    }
  }, [navigate, booking]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(pos => {
      setCurrLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (!booking) return;
    const onConnect = () => {
      hikerSocket.emit('hike:join', booking.rideBooking.hikeId);
    };

    hikerSocket.on('connect', onConnect);

    if (!hikerSocket.connected) {
      hikerSocket.connect();
    } else {
      onConnect();
    }

    hikerSocket.on(
      'ride:deviated',
      (data: { data: RouteDeviationResDTO; message: string }) => {
        setDeviationAlert({
          isOpen: true,
          message: data.message,
          data: data.data,
        });
        toast.warning(data.message);
      }
    );

    const handlePickedUp = () => {
      dispatch(setBookingStatus('PICKED UP'));
      toast.success('Pickup completed');
    };
    hikerSocket.on('ride:picked_up', handlePickedUp);

    return () => {
      hikerSocket.off('connect', onConnect);
      hikerSocket.off('ride:deviated');
      hikerSocket.off('ride:picked_up', handlePickedUp);
    };
  }, [booking, hikerSocket]);

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

  const handleMarkDropOff = async () => {
    if (!bookingId) return;
    try {
      setDropoffLoading(true);
      await markDropOff(bookingId);
      navigate(`/hike/${booking.rideBooking.hikeId}`, { replace: true });
    } catch (error) {
      handleApiError(error);
    } finally {
      setDropoffLoading(false);
    }
  };

  const handleRefresh = () => {
    if (!bookingId) return;
    dispatch(getBookingLiveThunk(bookingId));
  };

  const handleReqCancel = async () => {
    if (!bookingId) return;
    try {
      setReqCancelLoading(true);
      const data = await reqCancel(bookingId);
      setRefundData(data);
      setIsOpen(true);
    } catch (error) {
      handleApiError(error);
    } finally {
      setReqCancelLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!bookingId) return;
    try {
      setReqCancelLoading(true);
      await cancelBooking(bookingId);
      navigate(`/hike/${booking.rideBooking.hikeId}`, { replace: true });
    } catch (error) {
      handleApiError(error);
    } finally {
      setReqCancelLoading(false);
    }
  };

  const handleTriggerSos = async () => {
    const dto: TriggerSosHikerDTO = {
      bookingId: booking.rideBooking.bookingId,
      location: currLocation,
    };
    try {
      await triggerSosHiker(dto);
      toast.warning('SOS Triggered successfully', {
        description: 'Our support team reach you soon',
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {deviationAlert.data && (
        <DeviationAlertModal
          isOpen={deviationAlert.isOpen}
          data={deviationAlert.data}
          handleSos={handleTriggerSos}
          message={deviationAlert.message}
          onClose={() =>
            setDeviationAlert({ ...deviationAlert, isOpen: false })
          }
        />
      )}
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Title Section */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-lg shadow-slate-900/20">
              <Car
                size={20}
                className={
                  rideBooking.status === 'PICKED UP' ? 'animate-pulse' : ''
                }
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text">
                Ride in Progress
              </h1>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
                <span className="uppercase tracking-wider">ID:</span>
                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                  {rideBooking.bookingNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Action & Status Section */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm border ${
                rideBooking.status === 'PICKED UP'
                  ? 'bg-blue-50 text-blue-700 border-blue-100'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-100'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  rideBooking.status === 'PICKED UP'
                    ? 'bg-blue-500 animate-pulse'
                    : 'bg-emerald-500'
                }`}
              />
              {rideBooking.status}
            </div>

            {rideBooking.status == 'PICKED UP' ? (
              <button
                className="cursor-pointer group relative px-4 py-2 sm:py-2.5 rounded-xl text-white font-bold overflow-hidden shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                onClick={handleMarkDropOff}
                disabled={dropoffLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-500" />
                <div className="relative flex items-center justify-center gap-2">
                  {dropoffLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Marking...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Complete Ride</span>
                    </>
                  )}
                </div>
              </button>
            ) : (
              <button
                className="cursor-pointer group relative px-4 py-2 rounded-xl text-white font-semibold overflow-hidden shadow-md hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                onClick={handleReqCancel}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-500" />
                <div className="relative flex items-center justify-center gap-2">
                  {reqCancelLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span>Cancel</span>
                    </>
                  )}
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mx-auto p-0 md:p-4 flex flex-col md:grid md:grid-cols-2 gap-0 md:gap-4 items-stretch">
        {/* Left Panel (Booking/Chat) */}
        <div className="order-2 md:order-1 w-full h-[calc(100vh-80px)] md:h-auto flex flex-col">
          {!showChat && (
            <BookingSection booking={booking} onChatClick={handleChatClick} />
          )}
          {showChat && (
            <div className="w-full h-full">
              <ChatInterface
                onBack={onChatBack}
                role={showChat.role}
                user={showChat.user}
              />
            </div>
          )}
        </div>

        {/* Map Section */}
        <div className="order-1 md:order-2 w-full h-[calc(100vh-80px)] md:h-auto md:min-h-[80vh] relative space-y-0 md:space-y-4">
          <button
            className="absolute bottom-4 left-4 z-10 bg-white rounded-full p-2 cursor-pointer shadow-lg"
            onClick={handleRefresh}
          >
            <RotateCw size={20} />
          </button>
          <HikeStartedMap
            bookingStatus={rideBooking.status}
            riderLocation={riderLocation}
            pickup={hikerPickup}
            destination={hikerDestination}
          />
        </div>

        <GenericModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          title="Cancellation Summary"
          subtitle="Based on rider location & ETA"
          primaryAction={{
            className: 'bg-red-500 hover:bg-red-600',
            label: 'Confirm Cancel',
            loading: reqCancelLoading,
            onClick: handleCancel,
          }}
        >
          {refundData && <RefundModel refundData={refundData} />}
        </GenericModal>
      </div>
      <SosButton className="bottom-6 right-6" handleClick={handleTriggerSos} />
    </div>
  );
};
