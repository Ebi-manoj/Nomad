import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

export interface PaymentSuccessProps {
  countdown: number;
  handleRedirect: () => void;
}

export const PaymentSuccess = ({
  countdown,
  handleRedirect,
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

          <Button
            onClick={handleRedirect}
            className="w-3/4 bg-green-600 hover:bg-green-700 text-white"
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
