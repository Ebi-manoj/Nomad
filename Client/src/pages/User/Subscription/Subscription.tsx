import type { RootState } from '@/store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SubscriptionListing } from './SubscriptionListing';
import { SubscriptionDetailsPage } from './SubscriptionDetails';
import { SubscriptionDetailsSkeleton } from '@/components/skeletons/SubscriptionDetailsSkeleton';

export const SubscriptionPage = () => {
  const [page, setPage] = useState<'list' | 'details'>('details');
  const { data, loading } = useSelector(
    (state: RootState) => state.subscription
  );

  const handleManage = () => setPage('list');
  const handleBack = () => setPage('details');
  if (loading || !data) {
    return <SubscriptionDetailsSkeleton />;
  }
  return (
    <>
      {page === 'list' ? (
        <SubscriptionListing handleBack={handleBack} tier={data.tier} />
      ) : (
        <SubscriptionDetailsPage data={data} handleManage={handleManage} />
      )}
    </>
  );
};
