import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import type { ConfirmHikerPaymentDTO } from '@/types/payment';

export interface PaymentSuccessProps {
  countdown: number;
  handleRedirect: () => void;
  bookingDetails: ConfirmHikerPaymentDTO;
}

export const PaymentSuccess = ({
  countdown,
  handleRedirect,
  bookingDetails,
}: PaymentSuccessProps) => {
  const fullPageContainer =
    'min-h-screen w-full flex flex-col items-center justify-center p-4 text-center';
  const { width, height } = useWindowSize();
  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        tweenDuration={3000}
        numberOfPieces={400}
        style={{
          position: 'fixed',
          left: 0,
          zIndex: 0,
        }}
      />
      <div
        className={`${fullPageContainer} bg-gradient-to-br from-green-50 to-blue-50`}
      >
        <div className="flex flex-col items-center justify-center max-w-lg w-full">
          <div className="mb-6">
            <div className="relative inline-flex">
              <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-14 h-14 text-green-600" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping"></div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Your booking is confirmed. Get ready for your adventure!
          </p>

          <div className="bg-white shadow-md rounded-xl p-4 w-full mb-6 text-left border border-green-100">
            <h2 className="text-lg font-semibold text-green-700 mb-2">
              Booking Details
            </h2>
            <div className="space-y-1 text-gray-700 text-sm">
              <p>
                <span className="font-medium text-gray-800">Booking ID:</span>{' '}
                {bookingDetails.bookingId}
              </p>
              <p>
                <span className="font-medium text-gray-800">Payment ID:</span>{' '}
                {bookingDetails.paymentId}
              </p>
              <p>
                <span className="font-medium text-gray-800">Seats Booked:</span>{' '}
                {bookingDetails.seatsBooked}
              </p>
              <p>
                <span className="font-medium text-gray-800">Amount:</span> ₹
                {bookingDetails.amount.toLocaleString()}
              </p>
              <p>
                <span className="font-medium text-gray-800">Platform Fee:</span>{' '}
                ₹{bookingDetails.platformFee.toLocaleString()}
              </p>
            </div>
          </div>

          <Button
            onClick={handleRedirect}
            className="w-3/4 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          >
            Start Your Adventure <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-sm text-blue-700 mt-3">
            Auto redirecting in{' '}
            <span className="font-bold text-blue-600">{countdown}</span>{' '}
            seconds...
          </p>
        </div>
      </div>
    </>
  );
};
