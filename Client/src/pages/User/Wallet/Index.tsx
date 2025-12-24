import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { WalletBalance } from './WalletBalance';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  fetchBankAccounts,
  deleteBankAccount,
} from '@/store/features/user/bankAccount/bankAccount.thunk';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import type { BankAccountDTO } from '@/store/features/user/bankAccount/bankAccount';

import { BankAccounts } from './BankAccounts';
import { AddBankAccountModal } from './AddBankModal';
import { Transactions } from './Transactions';
import { GenericModal } from '@/components/GenericModel';

export const WalletPage = () => {
  const dispatch = useAppDispatch();
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccountDTO | null>(
    null
  );
  const { accounts } = useSelector((state: RootState) => state.bankAccount);

  useEffect(() => {
    dispatch(fetchBankAccounts());
  }, [dispatch]);

  const handleDeletBankAccount = async () => {
    if (!selectedAccount) return;
    try {
      setConfirmLoading(true);
      await dispatch(deleteBankAccount(selectedAccount.id)).unwrap();
    } finally {
      setConfirmLoading(false);
      setDeleteModal(false);
      setSelectedAccount(null);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">My Wallet</h1>
            <p className="text-muted-foreground">
              Manage your balance, linked accounts, and transactions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <WalletBalance canWithDraw={accounts.length > 0} />
            <BankAccounts
              accounts={accounts}
              handleAddClick={() => setIsAddBankModalOpen(true)}
              onRequestDelete={account => {
                setSelectedAccount(account);
                setDeleteModal(true);
              }}
            />
          </div>

          <Transactions />
        </div>
        <AddBankAccountModal
          isOpen={isAddBankModalOpen}
          onClose={() => setIsAddBankModalOpen(false)}
        />
      </div>
      <GenericModal
        isOpen={deleteModal}
        onClose={() => {
          if (confirmLoading) return;
          setDeleteModal(false);
          setSelectedAccount(null);
        }}
        title="Delete Bank Account"
        titleIcon={<ShieldAlert size={20} />}
        subtitle={
          selectedAccount
            ? `Are you sure you want to delete ${
                selectedAccount.bankName
              } (${selectedAccount.accountNumber.slice(-4)})?`
            : 'Are you sure want to delete this account'
        }
        primaryAction={{
          label: 'Confirm',
          className: 'bg-red-600 hover:bg-red-700',
          loading: confirmLoading,
          onClick: handleDeletBankAccount,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => {
            if (confirmLoading) return;
            setDeleteModal(false);
            setSelectedAccount(null);
          },
        }}
      />
    </>
  );
};
