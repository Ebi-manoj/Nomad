import { useState, useEffect } from 'react';
import { PaymentLoading } from './Loading';
import { PaymentSuccess } from './Success';
import { PaymentFailed } from './Failed';
import { useSearchParams } from 'react-router-dom';

export const PaymentSuccessPage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>(
    'loading'
  );
  const [countdown, setCountdown] = useState(100);
  const [retrying, setRetrying] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');

  // Simulate API call
  useEffect(() => {
    if (!paymentIntentId) {
      setStatus('failed');
      return;
    }

    // Simulate success
    setTimeout(() => {
      setStatus('failed');
    }, 4000);
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
      window.location.href = '/hike/started';
    }
  }, [status, countdown]);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setStatus('success');
      setRetrying(false);
    }, 2000);
  };

  const handleRedirect = () => {
    window.location.href = '/hike/started';
  };

  //  Loading State
  if (status === 'loading') {
    return <PaymentLoading />;
  }

  //Success State
  if (status === 'success') {
    return (
      <PaymentSuccess countdown={countdown} handleRedirect={handleRedirect} />
    );
  }

  //  Failed State
  if (status === 'failed') {
    return <PaymentFailed retrying={retrying} handleRetry={handleRetry} />;
  }

  return null;
};
