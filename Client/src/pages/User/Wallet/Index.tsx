import { useEffect, useState } from 'react';
import { TransactionItem } from './TransactionItem';
import { WalletBalance } from './WalletBalance';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchWalletDetails } from '@/store/features/user/wallet/wallet.thunk';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { WalletSkelton } from '@/components/skeletons/WalletSkeloton';
import { Pagination } from '@/components/Pagination';

export const WalletPage = () => {
  const dispatch = useAppDispatch();
  const { walletData, loading } = useSelector(
    (state: RootState) => state.wallet
  );
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 10;

  useEffect(() => {
    dispatch(fetchWalletDetails(page));
  }, [dispatch, page]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">My Wallet</h1>
          <p className="text-muted-foreground">
            Manage and track your transactions
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
            {loading && <WalletSkelton />}
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
          {walletData.pagination.total > 0 && (
            <Pagination
              totalPages={Math.max(
                1,
                Math.ceil(walletData.pagination.total / PAGE_SIZE)
              )}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};
