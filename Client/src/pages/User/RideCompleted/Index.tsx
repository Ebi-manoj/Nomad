import { getRideDetails } from '@/api/ride';
import { rateUser } from '@/api/review';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { handleApiError } from '@/utils/HandleApiError';
import { clearRideData } from '@/store/features/user/ride/rideSlice';
import type { GetRideDetailsResDTO } from '@/types/ride';
import { ReviewType, type RateUserReqDTO } from '@/types/review';
import type { ReviewFormData } from '@/validation/review';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { RideCompletedHeader } from './RideCompletedHeader';
import { RideSummarySection } from './RideSummarySection';
import { RidePassengersSection } from './RidePassengersSection';
import { RidePassengerReviewModal } from './RidePassengerReviewModal';

export const RideCompletedPage = () => {
  const navigate = useNavigate();
  const [rideData, setRideData] = useState<GetRideDetailsResDTO | undefined>(
    undefined
  );
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [selectedHikerId, setSelectedHikerId] = useState<string | null>(null);
  const [selectedHikerName, setSelectedHikerName] = useState<string | null>(
    null
  );
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const handleRedirect = () => {
    navigate('/ride', { replace: true });
    dispatch(clearRideData());
  };

  const { rideId } = useParams();

  useEffect(() => {
    if (!rideId) return;
    const fetch = async () => {
      try {
        const data = await getRideDetails(rideId);
        setRideData(data);
      } catch (error) {
        handleApiError(error);
      }
    };
    fetch();
  }, []);

  if (!rideData) return <div>No Ride Found</div>;
  const grossCollected = rideData.totalCostShared + rideData.platformFee;
  const netEarnings = rideData.totalCostShared;
  const platformFee = rideData.platformFee;

  const openReviewModal = (
    bookingId: string,
    hikerUserId: string,
    hikerName: string
  ) => {
    setSelectedBookingId(bookingId);
    setSelectedHikerId(hikerUserId);
    setSelectedHikerName(hikerName);
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = async (data: ReviewFormData) => {
    if (!selectedBookingId || !selectedHikerId) return;

    const payload: RateUserReqDTO = {
      bookingId: selectedBookingId,
      reviewedUserId: selectedHikerId,
      type: ReviewType.RIDER_TO_HIKER,
      rating: data.rating,
      reviewText: data.reviewText.trim(),
    };

    try {
      setReviewSubmitting(true);
      const res = await rateUser(payload);
      if (res) {
        toast.success('Review submitted successfully');
        setRideData(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            hikersMatched: prev.hikersMatched.map(booking =>
              booking.bookingId === selectedBookingId
                ? { ...booking, review: res }
                : booking
            ),
          };
        });
        setReviewModalOpen(false);
        setSelectedBookingId(null);
        setSelectedHikerId(null);
        setSelectedHikerName(null);
      }
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card p-8 pb-4 mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <RideCompletedHeader totalCostShared={rideData.totalCostShared} />

          {/* Main Content Grid */}
          <div className="flex gap-6 max-w-7xl mx-auto">
            {/* Ride Summary - Left Side */}
            <div className="bg-card rounded-2xl p-6 border shadow-sm w-full">
              <RideSummarySection
                rideData={rideData}
                grossCollected={grossCollected}
                netEarnings={netEarnings}
                platformFee={platformFee}
              />

              <RidePassengersSection
                hikersMatched={rideData.hikersMatched}
                grossCollected={grossCollected}
                onRateClick={openReviewModal}
              />
            </div>
          </div>

          {/* Back Button */}
          <button
            className="cursor-pointer flex items-center justify-center gap-2 mx-auto mt-8 text-muted-foreground hover:text-foreground font-medium transition-colors group"
            onClick={handleRedirect}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go back home
          </button>

          <RidePassengerReviewModal
            isOpen={reviewModalOpen}
            selectedHikerName={selectedHikerName}
            reviewSubmitting={reviewSubmitting}
            onClose={() => {
              setReviewModalOpen(false);
              setSelectedBookingId(null);
              setSelectedHikerId(null);
              setSelectedHikerName(null);
            }}
            onSubmit={handleReviewSubmit}
          />
        </div>
      </div>
    </div>
  );
};
