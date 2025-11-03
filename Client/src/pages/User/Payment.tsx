import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Car,
  Flag,
  MapPin,
  Star,
  Clock,
  AlertCircle,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import type { HikerPaymentInfoResponseDTO } from '@/types/payment';
import { getHikePayment } from '@/api/payment';

export const Payment = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<number | null>(null);

  const [paymentData, setPaymentData] =
    useState<HikerPaymentInfoResponseDTO | null>(null);

  // Fetch payment info
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        if (!paymentId) {
          toast.error('Invalid payment link.');
          navigate('/hike');
          return;
        }

        setLoading(true);
        const data = await getHikePayment(paymentId);
        setPaymentData(data);

        if (data.expiresAt) {
          const diff = Math.floor(
            (new Date(data.expiresAt).getTime() - Date.now()) / 1000
          );
          setTimeLeft(diff > 0 ? diff : 0);
        }
      } catch (error) {
        toast.error('Failed to load payment details. Please try again.');
        console.error('Payment fetch error:', error);
        navigate('/hike');
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [paymentId, navigate]);

  // Start timer
  useEffect(() => {
    if (!timeLeft || timerRef.current) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timeLeft]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-68px)] bg-green-50">
        <p className="text-gray-600 font-medium">Loading payment details...</p>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-68px)] bg-green-50 text-center px-4">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          No Payment Found
        </h2>
        <p className="text-gray-600 mb-4">
          This payment link is invalid or expired.
        </p>
        <Button
          onClick={() => navigate('/hike')}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Go Back
        </Button>
      </div>
    );
  }

  const { rider, route, amount, platformFee, totalAmount } = paymentData;

  if (isExpired) {
    return (
      <div className="flex flex-col bg-green-50 h-[calc(100vh-68px)]">
        <div className="flex-1 min-h-0 overflow-auto">
          <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <AlertCircle size={48} className="text-red-600" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Payment Expired
              </h2>

              <p className="text-gray-600 mb-6 text-base md:text-lg max-w-md">
                Your payment session has expired. The ride request has been
                cancelled automatically.
              </p>

              <div className="w-full bg-gray-50 rounded-xl p-4 md:p-6 mb-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 text-left">
                  What happens next?
                </h3>
                <ul className="space-y-2 text-left text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">•</span>
                    <span>The ride booking has been cancelled</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">•</span>
                    <span>No charges have been applied to your account</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">•</span>
                    <span>You can search for a new ride anytime</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => navigate('/hike')}
                className="w-full max-w-md py-3 text-base font-semibold bg-gray-900 hover:bg-gray-800 text-white"
              >
                Find New Ride
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <span className="text-white font-semibold">₹{amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-50">Platform Fee</span>
                <span className="text-white font-semibold">₹{platformFee}</span>
              </div>
              <div className="h-px bg-green-500 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Total Payable</span>
                <span className="text-lg md:text-xl font-bold text-white">
                  ₹{totalAmount}
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
            <Button className="py-3 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white cursor-pointer">
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
