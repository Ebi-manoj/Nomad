import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PaymentExpired = () => {
  const navigate = useNavigate();
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
              className="cursor-pointer w-full max-w-md py-3 text-base font-semibold bg-gray-900 hover:bg-gray-800 text-white"
            >
              Find New Ride
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
