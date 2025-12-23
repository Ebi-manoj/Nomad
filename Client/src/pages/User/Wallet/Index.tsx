import { useEffect, useState } from 'react';
import { TransactionItem } from './TransactionItem';
import { WalletBalance } from './WalletBalance';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchWalletDetails } from '@/store/features/user/wallet/wallet.thunk';
import { fetchBankAccounts } from '@/store/features/user/bankAccount/bankAccount.thunk';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { WalletSkelton } from '@/components/skeletons/WalletSkeloton';
import { Pagination } from '@/components/Pagination';
import { BankAccounts } from './BankAccounts';

export const WalletPage = () => {
  const PAGE_SIZE = 10;
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);

  const { walletData, loading } = useSelector(
    (state: RootState) => state.wallet
  );
  const { accounts } = useSelector((state: RootState) => state.bankAccount);

  useEffect(() => {
    dispatch(fetchWalletDetails(page));
    dispatch(fetchBankAccounts());
  }, [dispatch, page]);

  const totalTransactions = walletData.pagination.total ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">My Wallet</h1>
          <p className="text-muted-foreground">
            Manage your balance, linked accounts, and transactions.
          </p>
        </div>

        {/* Top cards: Balance + Linked accounts */}
        <div className="grid gap-4 md:grid-cols-2">
          <WalletBalance canWithDraw={accounts.length > 0} />
          <BankAccounts
            accounts={accounts}
            handleAddClick={() => setIsAddBankModalOpen(true)}
          />
        </div>

        {/* Transactions section */}
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
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
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
      </div>

      {/* TODO: AddBankAccountDialog controlled by isAddBankModalOpen */}
    </div>
  );
};
