import { Button } from '@/components/ui/button';
import type { HikerPaymentInfoResponseDTO } from '@/types/payment';
import { Car, Clock, Flag, MapPin, Star, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentSummaryProps {
  timeLeft: number;
  paymentData: HikerPaymentInfoResponseDTO;
  handlePaymentIntent: () => void;
}

export const PaymentSummary = ({
  timeLeft,
  paymentData,
  handlePaymentIntent,
}: PaymentSummaryProps) => {
  const { rider, route, amount, platformFee, totalAmount } = paymentData;
  const navigate = useNavigate();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft > 300) return 'text-green-600 bg-green-50 border-green-200';
    if (timeLeft > 120) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };
  return (
    <div className="flex flex-col bg-green-50 h-[calc(100vh-68px)]">
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="max-w-2xl mx-auto px-4 py-4 md:py-6">
          {/* Timer */}
          <div className="mb-4">
            <div
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 border text-sm ${getTimerColor()}`}
            >
              <Clock size={16} />
              <span className="font-semibold">
                Complete payment in {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Rider Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 mb-3 shadow-sm">
            <div className="flex items-center gap-3">
              {rider.profilePic ? (
                <img
                  src={rider.profilePic || '/default-avatar.png'}
                  alt="Rider Avatar"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-200 object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                  <User size={24} className="text-gray-400" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h2 className="text-sm md:text-base font-bold text-gray-900 mb-0.5 truncate">
                  {rider.fullName}
                </h2>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      fill="#fbbf24"
                      className="text-yellow-400"
                    />
                    <span className="font-semibold text-gray-700">
                      {rider.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-xs text-gray-600">Verified Driver</span>
                </div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
          </div>

          {/* Route Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 mb-3 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Car size={16} className="text-gray-700" />
              <h3 className="font-semibold text-gray-900 text-sm">
                Trip Details
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white ring-2 ring-green-200" />
                  <div className="w-[2px] h-10 bg-gray-300" />
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-green-600" />
                      <span className="text-xs font-medium text-gray-700">
                        Pickup Location
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-gray-900">
                      {route.distanceAwayfromPickup.toFixed(2)} km away
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="flex flex-col items-center pt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white ring-2 ring-red-200" />
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flag size={14} className="text-red-600" />
                      <span className="text-xs font-medium text-gray-700">
                        Destination
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-gray-900">
                      {route.distanceAwayfromDestination.toFixed(2)} km
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-green-500 rounded-xl p-4 md:p-5 mb-4 shadow-sm">
            <h3 className="text-white font-bold mb-3 text-sm">
              Payment Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-green-50">Cost Sharing</span>
                <span className="text-white font-semibold">
                  ₹{amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-50">Platform Fee</span>
                <span className="text-white font-semibold">
                  ₹{platformFee.toFixed(2)}
                </span>
              </div>
              <div className="h-px bg-green-500 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Total Payable</span>
                <span className="text-lg md:text-xl font-bold text-white">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Button
              variant="outline"
              onClick={() => navigate('/hike')}
              className="py-3 text-sm font-semibold border-1 border-red-400 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              className="py-3 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              onClick={handlePaymentIntent}
            >
              Proceed to Pay
            </Button>
          </div>

          <div className="text-center pb-6">
            <p className="text-sm text-gray-500">
              🔒 Secure payment • Your data is encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
