import { WalletSkelton } from '@/components/skeletons/WalletSkeloton';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TransactionItem } from './TransactionItem';
import { Pagination } from '@/components/Pagination';
import { fetchWalletDetails } from '@/store/features/user/wallet/wallet.thunk';

export const Transactions = React.memo(() => {
  const { walletData, loading } = useSelector(
    (state: RootState) => state.wallet
  );
  const PAGE_SIZE = 10;
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const totalTransactions = walletData.pagination.total ?? 0;

  useEffect(() => {
    dispatch(fetchWalletDetails(page));
  }, [dispatch, page]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Recent transactions
        </h2>
        <span className="text-sm text-muted-foreground">
          {totalTransactions} transactions
        </span>
      </div>

      <div className="space-y-3">
        {loading && <WalletSkelton />}

        {!loading &&
          walletData.transactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}

        {!loading && walletData.transactions.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No transactions found.
          </p>
        )}
      </div>

      {totalTransactions > 0 && (
        <Pagination
          totalPages={Math.max(1, Math.ceil(totalTransactions / PAGE_SIZE))}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
});
