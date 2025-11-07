import { Button } from '@/components/ui/button';
import { XCircle, Loader2 } from 'lucide-react';

export interface PaymentFailedProps {
  retrying: boolean;
  handleRetry: () => void;
}

export const PaymentFailed = ({
  retrying,
  handleRetry,
}: PaymentFailedProps) => {
  const fullPageContainer =
    'min-h-screen w-full flex flex-col items-center justify-center p-4 text-center';
  return (
    <div
      className={`${fullPageContainer} bg-gradient-to-br from-red-50 to-orange-50`}
    >
      <div className="flex flex-col items-center justify-center max-w-lg w-full">
        <div className="mb-6">
          <div className="relative inline-flex">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          We couldn’t confirm your payment. Please try again.
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => (window.location.href = '/')}
            className="border-gray-300 text-gray-700"
          >
            Go Home
          </Button>

          <Button
            onClick={handleRetry}
            disabled={retrying}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {retrying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Retrying...
              </>
            ) : (
              'Retry'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
