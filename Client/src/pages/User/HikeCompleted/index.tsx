import { useEffect, useState } from 'react';
import {
  MapPin,
  Navigation,
  Clock,
  DollarSign,
  User,
  Star,
  ArrowLeft,
} from 'lucide-react';
import type { GetHikeDetailsResponseDTO } from '@/types/hike';
import { useNavigate, useParams } from 'react-router-dom';
import { getHikeDetails } from '@/api/hike';
import { useHandleApiError } from '@/hooks/useHandleApiError';
import { HomeSkeleton } from '@/components/skeletons/HomeSkeleton';
import { formatDuration } from '@/utils/dateFormater';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { clearHikeData } from '@/store/features/user/hike/hikeSlice';
import { SuccessBadge } from './SuccessBadge';
import { CancelledBadge } from './CancelledBadge';
import { SuccessHeader } from './SuccessHeader';
import { CancelledHeader } from './CancelledHeader';
import { ReviewForm } from '@/components/ReviewForm';
import { RiRefund2Fill } from 'react-icons/ri';
import { ReviewType, type RateUserReqDTO } from '@/types/review';
import { rateUser } from '@/api/review';
import { toast } from 'sonner';
import type { ReviewFormData } from '@/validation/review';

export const HikeCompletedPage = () => {
  const [hikeDetails, setHikeDetails] =
    useState<GetHikeDetailsResponseDTO | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const { hikeId } = useParams();

  useEffect(() => {
    if (!hikeId) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getHikeDetails(hikeId);
        console.log(data);
        setHikeDetails(data);
      } catch (error) {
        useHandleApiError(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [hikeId]);

  if (loading) return <HomeSkeleton />;

  if (!hikeDetails) return <div>Hike Details not Found</div>;

  const handleRedirect = () => {
    dispatch(clearHikeData());
    navigate('/hike', { replace: true });
  };

  const reviewOnSubmit = async (data: ReviewFormData) => {
    if (!hikeDetails) return;
    const { bookingDetails, riderId } = hikeDetails;
    if (!bookingDetails || !riderId) return;
    const payload: RateUserReqDTO = {
      bookingId: bookingDetails.bookingId,
      reviewedUserId: riderId,
      type: ReviewType.HIKER_TO_RIDER,
      rating: data.rating,
      reviewText: data.reviewText.trim(),
    };

    const res = await rateUser(payload);
    if (res) {
      toast.success('Review submitted successfully');
      setHikeDetails({ ...hikeDetails, review: res });
    }
  };

  const { status } = hikeDetails;

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <div className="bg-white  p-8 pb-4 mb-6 relative overflow-hidden">
        <div className="relative z-10">
          {/* Success Badge */}
          {status === 'completed' && (
            <>
              <SuccessBadge />
              <SuccessHeader />
            </>
          )}
          {status === 'cancelled' && (
            <>
              <CancelledBadge />
              <CancelledHeader />
            </>
          )}
          {/* Trip Summary Card */}
          <div className="flex gap-6 p-2">
            {/* Trip Summary */}
            <div
              className={`bg-white rounded-2xl p-6 text-black w-full ${
                !hikeDetails.review && 'basis-[65%]'
              } shadow-xs mx-auto`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Navigation className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold">Hiking Summary</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Pickup */}
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-gray-50">
                  <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Pickup</p>
                    <p className="font-semibold text-base">
                      {hikeDetails.pickupAddress.split(',')[0]}
                    </p>
                  </div>
                </div>

                {/* Booking Number */}
                {hikeDetails.bookingDetails && (
                  <div className="flex items-start gap-3 p-4 border rounded-xl bg-gray-50">
                    <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold text-sm">
                        ID
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Booking Number</p>
                      <p className="font-semibold text-base">
                        {hikeDetails.bookingDetails.bookingNumber}
                      </p>
                    </div>
                  </div>
                )}

                {/* Destination */}
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-gray-50">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Destination</p>
                    <p className="font-semibold text-base">
                      {hikeDetails.destinationAddress.split(',')[0]}
                    </p>
                  </div>
                </div>

                {/* Distance */}
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-gray-50">
                  <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Distance</p>
                    <p className="font-semibold text-base">
                      {hikeDetails.totalDistance.toFixed(2)}km
                    </p>
                  </div>
                </div>

                {/* Duration */}
                {status === 'completed' && (
                  <div className="flex items-start gap-3 p-4 border rounded-xl bg-gray-50">
                    <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Duration</p>
                      <p className="font-semibold text-base">
                        {formatDuration(
                          hikeDetails.bookingDetails?.completedAt!,
                          hikeDetails.createdAt
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {status === 'cancelled' && (
                  <div className="flex items-start gap-3 p-4 border rounded-xl bg-gray-50">
                    <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                      <RiRefund2Fill className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Refund Amount</p>
                      <p className="font-semibold text-base">
                        ₹{hikeDetails.bookingDetails?.refundAmount}
                      </p>
                    </div>
                  </div>
                )}

                {/* Cost */}
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-gray-50">
                  <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Cost Shared</p>
                    <p className="font-semibold text-base">
                      ₹{hikeDetails.paymentDetails?.amount}
                    </p>
                  </div>
                </div>

                {/* Rider */}
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-gray-50">
                  <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Rider</p>
                    <p className="font-semibold text-base">Ebi Manoj</p>

                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">
                        {hikeDetails.rider?.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            {hikeDetails.bookingDetails &&
              hikeDetails.riderId &&
              !hikeDetails.review && (
                <div className="bg-white rounded-2xl p-6 basis-[35%] shadow-xs flex justify-center items-center">
                  <ReviewForm onSubmitted={reviewOnSubmit} />
                </div>
              )}
          </div>
        </div>
        <button
          className="cursor-pointer flex items-center justify-center gap-2 mx-auto mt-8 text-gray-600 hover:text-gray-900 font-medium transition-colors group"
          onClick={handleRedirect}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Go back home
        </button>
      </div>
    </div>
  );
};
