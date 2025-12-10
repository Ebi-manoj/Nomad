import type { RootState } from '@/store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SubscriptionListing } from './SubscriptionListing';
import { SubscriptionDetailsPage } from './SubscriptionDetails';

export const SubscriptionPage = () => {
  const [page, setPage] = useState<'list' | 'details'>('details');
  const data = useSelector((state: RootState) => state.subscription.data);
  if (!data) return;

  const handleManage = () => setPage('list');
  const handleBack = () => setPage('details');

  return (
    <>
      {page === 'list' ? (
        <SubscriptionListing handleBack={handleBack} />
      ) : (
        <SubscriptionDetailsPage data={data} handleManage={handleManage} />
      )}
    </>
  );
};
