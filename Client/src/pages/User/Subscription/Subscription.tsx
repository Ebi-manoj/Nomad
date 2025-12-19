import type { RootState } from '@/store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SubscriptionListing } from './SubscriptionListing';
import { SubscriptionDetailsPage } from './SubscriptionDetails';
import { Loader2 } from 'lucide-react';

export const SubscriptionPage = () => {
  const [page, setPage] = useState<'list' | 'details'>('details');
  const { data, loading } = useSelector(
    (state: RootState) => state.subscription
  );

  const handleManage = () => setPage('list');
  const handleBack = () => setPage('details');
  if (loading || !data) {
    return (
      <div className="flex items-center w-full h-full justify-center">
        <Loader2 className="bg-gray-400 animate-spin" />
      </div>
    );
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
