import { useEffect, useState } from 'react';
import {
  Check,
  MapPin,
  Navigation,
  Clock,
  DollarSign,
  User,
  Star,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import type { GetHikeDetailsResponseDTO } from '@/types/hike';
import { useParams } from 'react-router-dom';
import { getHikeDetails } from '@/api/hike';
import { useHandleApiError } from '@/hooks/useHandleApiError';
import { HomeSkeleton } from '@/components/skeletons/HomeSkeleton';
import { formatDuration } from '@/utils/dateFormater';

export const HikeCompletedPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hikeDetails, setHikeDetails] =
    useState<GetHikeDetailsResponseDTO | null>(null);

  const [loading, setLoading] = useState(false);

  const { hikeId } = useParams();

  const handleSubmit = () => {
    alert(
      `Thank you for your feedback!\nRating: ${rating} stars\nFeedback: ${feedback}`
    );
  };

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

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <div className="bg-white  p-8 pb-4 mb-6 relative overflow-hidden">
        <div className="relative z-10">
          {/* Success Badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3">
              Journey <span className="text-emerald-500">completed</span>
              <span className="ml-2">🎉</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Thank you for choosing{' '}
              <span className="font-semibold text-gray-900">Nomad</span>
            </p>
            <p className="text-gray-500 text-sm mt-1">
              We hope you had a safe and pleasant journey
            </p>
          </div>

          {/* Trip Summary Card */}
          <div className="flex gap-6 p-2">
            {/* Trip Summary */}
            <div className="bg-white rounded-2xl p-6 text-black basis-[65%] shadow-xs mx-auto">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Navigation className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold">Hiking Completed</h2>
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
            <div className="bg-white rounded-2xl p-6 basis-[35%] shadow-xs">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                Share Feedback
              </h3>

              {/* Rating */}
              <div className="mb-6">
                <p className="text-gray-700 font-medium mb-3 text-center">
                  Rate your ride:
                </p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="group transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-9 h-9 ${
                          star <= rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div className="mb-6">
                <textarea
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder="Write feedback..."
                  className="w-full h-24 px-3 py-2 border border-gray-200 rounded-lg
                   focus:border-emerald-500 focus:outline-none text-gray-700"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="w-full bg-emerald-600 hover:bg-emerald-700
                 text-white font-semibold py-3 rounded-lg
                 transition-all shadow"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <button className="cursor-pointer flex items-center justify-center gap-2 mx-auto mt-8 text-gray-600 hover:text-gray-900 font-medium transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Go back home
        </button>
      </div>
    </div>
  );
};
