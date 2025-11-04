import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PaymentNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-68px)] bg-green-50 text-center px-4">
      <AlertCircle size={48} className="text-red-500 mb-4" />
      <h2 className="text-lg font-bold text-gray-800 mb-2">No Payment Found</h2>
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
};
