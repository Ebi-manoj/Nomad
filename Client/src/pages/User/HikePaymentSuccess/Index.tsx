import { useState, useEffect } from 'react';
import { PaymentLoading } from './Loading';
import { PaymentSuccess } from './Success';
import { PaymentFailed } from './Failed';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPayment } from '@/api/payment';
import type { ConfirmHikerPaymentDTO } from '@/types/payment';

export const PaymentSuccessPage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>(
    'loading'
  );
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] =
    useState<ConfirmHikerPaymentDTO | null>(null);
  const [countdown, setCountdown] = useState(100);
  const [retrying, setRetrying] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');

  useEffect(() => {
    if (!paymentIntentId) {
      setStatus('failed');
      return;
    }
    const confirm = async () => {
      try {
        const data = await confirmPayment(paymentIntentId);
        console.log(data);
        setBookingDetails(data);
        setStatus('success');
      } catch (error) {
        setStatus('failed');
      }
    };
    confirm();
  }, []);

  // Countdown redirect
  useEffect(() => {
    if (status === 'success' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(c => c - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (status === 'success' && countdown === 0) {
      if (!bookingDetails) return;
      navigate(`/hike/started/${bookingDetails.bookingId}`, { replace: true });
    }
  }, [status, countdown]);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setStatus('success');
      setRetrying(false);
    }, 2000);
  };

  const handleRedirect = (id: string) => {
    navigate(`/hike/started/${id}`, { replace: true });
  };

  //  Loading State
  if (status === 'loading') {
    return <PaymentLoading />;
  }

  //Success State
  if (status === 'success' && bookingDetails) {
    return (
      <PaymentSuccess
        countdown={countdown}
        handleRedirect={() => handleRedirect(bookingDetails.bookingId)}
        bookingDetails={bookingDetails}
      />
    );
  }

  //  Failed State
  if (status === 'failed') {
    return <PaymentFailed retrying={retrying} handleRetry={handleRetry} />;
  }

  return null;
};
