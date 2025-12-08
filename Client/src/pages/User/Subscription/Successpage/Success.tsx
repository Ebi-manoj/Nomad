import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCompleted } from '@/store/features/user/subscription/subscriptionSlice';
import { verifySubscriptionApi } from '@/api/subscription';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { ShowError } from './ShowError';
import { ShowDetails } from './ShowDetails';
import { ProcessingLoader } from './Processing';

export const SubscriptionSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [status, setStatus] = useState<
    'loading' | 'success' | 'processing' | 'error'
  >('loading');
  const { data } = useSelector((state: RootState) => state.subscription);
  const [attempts, setAttempts] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    let pollInterval: ReturnType<typeof setInterval>;
    let timeoutId: ReturnType<typeof setTimeout>;

    const checkSubscription = async () => {
      try {
        const result = await verifySubscriptionApi(sessionId);

        if (result.status === 'completed' && result.subscription) {
          // SUCCESS!
          dispatch(setCompleted(result.subscription));
          setStatus('success');
          clearInterval(pollInterval);
          clearTimeout(timeoutId);
        } else if (result.status === 'processing') {
          // Still processing
          setStatus('processing');
          setAttempts(prev => prev + 1);
        }
      } catch (error) {
        console.error('Failed to verify subscription:', error);
        setAttempts(prev => prev + 1);
      }
    };

    // Initial check
    checkSubscription();

    // Poll every 2 seconds
    pollInterval = setInterval(checkSubscription, 2000);

    // Stop after 30 seconds
    timeoutId = setTimeout(() => {
      clearInterval(pollInterval);
      if (status !== 'success') {
        setStatus('processing');
      }
    }, 30000);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeoutId);
    };
  }, [sessionId]);

  if (status === 'loading' || status === 'processing') {
    return <ProcessingLoader attempts={attempts} />;
  }

  // Error State
  if (status === 'error') {
    return <ShowError />;
  }
  {
    return (
      data?.subscription && <ShowDetails subscription={data.subscription} />
    );
  }
};
