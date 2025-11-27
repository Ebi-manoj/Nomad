import { useEffect } from 'react';
import { TransactionItem } from './TransactionItem';
import { WalletBalance } from './WalletBalance';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchWalletDetails } from '@/store/features/user/wallet/wallet.thunk';
import { Skeleton } from '@/components/skeletons/skeleton';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export const WalletPage = () => {
  const dispatch = useAppDispatch();
  const { walletData, loading } = useSelector(
    (state: RootState) => state.wallet
  );

  useEffect(() => {
    dispatch(fetchWalletDetails());
  }, [dispatch]);

  const renderSkeletons = () => (
    <div className="space-y-3">
      {[...Array(4)].map((_, idx) => (
        <div
          key={idx}
          className="p-4 border border-border bg-card rounded-lg animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2 rounded" />
                <Skeleton className="h-3 w-1/3 rounded" />
              </div>
            </div>
            <Skeleton className="h-5 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">My Wallet</h1>
          <p className="text-muted-foreground">
            Manage your finances and track your transactions
          </p>
        </div>
        <WalletBalance />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Recent Transactions
            </h2>
            <span className="text-sm text-muted-foreground">
              {walletData.pagination.total} transactions
            </span>
          </div>

          <div className="space-y-3">
            {loading && renderSkeletons()}
            {!loading &&
              walletData.transactions.map(transaction => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            {!loading && !walletData.transactions.length && (
              <p className="text-sm text-muted-foreground">
                No transactions found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
