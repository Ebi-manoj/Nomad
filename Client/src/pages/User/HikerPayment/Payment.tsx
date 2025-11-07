import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import type { HikerPaymentInfoResponseDTO } from '@/types/payment';
import { createPaymentIntent, getHikePayment } from '@/api/payment';
import { PaymentNotFound } from './PaymentNotFound';
import { PaymentExpired } from './PaymentExpired';
import { PaymentSummary } from './PaymentSummary';
import { useHandleApiError } from '@/hooks/useHandleApiError';
import { Elements } from '@stripe/react-stripe-js';
import {
  appearance,
  stripePromise,
  type stripeOptionType,
} from '@/config/stripe';
import { CheckoutForm } from './CheckoutForm';

export const Payment = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentData, setPaymentData] =
    useState<HikerPaymentInfoResponseDTO | null>(null);

  const options = {
    appearance,
    clientSecret,
  } as stripeOptionType;

  //handlePaymentIntent
  const handlePaymentIntent = async () => {
    if (!paymentData) return;

    try {
      setLoading(true);
      const data = await createPaymentIntent(paymentData.totalAmount, 'inr', {
        product: 'Ride Payment',
        paymentId: paymentId,
      });
      console.log(data);
      setClientSecret(data.clientSecret);
      setShowPayment(true);
    } catch (error) {
      console.log(error);
      useHandleApiError(error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-68px)] bg-green-50">
        <p className="text-gray-600 font-medium">Loading payment details...</p>
      </div>
    );
  }

  if (!paymentData) {
    return <PaymentNotFound />;
  }

  if (isExpired || !timeLeft) {
    return <PaymentExpired />;
  }

  if (showPayment && clientSecret) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm w-full h-screen">
        <h3 className="font-semibold text-gray-900 mb-4 text-sm">
          Enter Payment Details
        </h3>
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm totalAmount={paymentData.totalAmount} />
        </Elements>
      </div>
    );
  }

  return (
    <PaymentSummary
      timeLeft={timeLeft}
      paymentData={paymentData}
      handlePaymentIntent={handlePaymentIntent}
    />
  );
};
