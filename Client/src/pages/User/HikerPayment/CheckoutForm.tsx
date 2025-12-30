import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { toast } from 'sonner';

export const CheckoutForm = ({ totalAmount }: { totalAmount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        toast.error(error.message || 'Payment failed. Please try again.');
        setProcessing(false);
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[70%] mx-auto">
      <div className="bg-gray-50 rounded-lg p-4">
        <PaymentElement />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={processing}
          className="py-3 text-sm font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!stripe || processing}
          className="py-3 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white cursor-pointer disabled:opacity-50"
        >
          {processing ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Processing...
            </span>
          ) : (
            `Pay ₹${totalAmount.toFixed(2)}`
          )}
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          🔒 Secure payment • Your data is encrypted
        </p>
      </div>
    </form>
  );
};
