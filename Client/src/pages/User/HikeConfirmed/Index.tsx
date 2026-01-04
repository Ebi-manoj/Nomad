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
import { AlertCircle, CheckCircle, Loader2, RotateCw } from 'lucide-react';
import { cancelBooking, markDropOff, reqCancel } from '@/api/rideBooking';
import { useHandleApiError } from '@/hooks/useHandleApiError';
import { GenericModal } from '@/components/GenericModel';
import type { ReqCancelBookingResDTO } from '@/types/hike';
import { RefundModel } from './RefundModel';
import { SosButton } from '@/components/SosButton';
import type { RouteDeviationResDTO, TriggerSosHikerDTO } from '@/types/sos';
import { triggerSosHiker } from '@/api/sos';
import { toast } from 'sonner';
import { hikerSocket } from '@/config/socket';
import DeviationAlertModal from './DeviationModel';

export const HikeStartedPage = () => {
  const [currLocation, setCurrLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showChat, setShowChat] = useState<ChatInterfaceProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reqCancelLoading, setReqCancelLoading] = useState(false);
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

    return () => {
      hikerSocket.off('connect', onConnect);
      hikerSocket.off('ride:deviated');
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
      await markDropOff(bookingId);
      navigate(`/hike/${booking.rideBooking.hikeId}`, { replace: true });
    } catch (error) {
      useHandleApiError(error);
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
      useHandleApiError(error);
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
      useHandleApiError(error);
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
      useHandleApiError(error);
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
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-semibold">Ride in Progress</h1>
            <p className="text-sm text-gray-500">
              Booking Number: {rideBooking.bookingNumber}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-yellow-100 text-green-700 text-sm font-medium rounded-full">
            {rideBooking.status}
          </span>
          {rideBooking.status == 'PICKED UP' ? (
            <button
              className="cursor-pointer group relative px-4 py-3 rounded-xl text-white font-bold overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleMarkDropOff}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

              <div className="relative flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 'group-hover:scale-110 transition-transform" />
                <span className="text-base">Mark as Completed</span>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-white/40 rounded-full blur-sm group-hover:w-full transition-all duration-300" />
            </button>
          ) : (
            <button className="cursor-pointer group relative px-4 py-2 h-10 sm:h-11 rounded-xl text-white font-semibold overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-500" />
              <div
                className="relative flex items-center justify-center gap-2"
                onClick={handleReqCancel}
              >
                {reqCancelLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span className="text-sm sm:text-base">Cancel Ride</span>
                  </>
                )}
              </div>
            </button>
          )}
          <SosButton handleClick={handleTriggerSos} />
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
        <div className="space-y-4 h-full relative">
          <button
            className="absolute bottom-2 left-2 z-10 bg-white rounded-full p-2 cursor-pointer"
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
    </div>
  );
};
