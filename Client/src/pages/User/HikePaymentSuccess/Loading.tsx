import { Loader2 } from 'lucide-react';

export const PaymentLoading = () => {
  const fullPageContainer =
    'min-h-screen w-full flex flex-col items-center justify-center p-4 text-center';

  return (
    <div
      className={`${fullPageContainer} bg-gradient-to-br from-green-50 to-blue-50`}
    >
      <div>
        <div className="mb-6">
          <div className="relative inline-flex">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">
          Confirming Your Payment
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          Please wait while we verify your payment...
        </p>
      </div>
    </div>
  );
};
