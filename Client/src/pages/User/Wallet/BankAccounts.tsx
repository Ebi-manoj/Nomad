import { CreditCard, Landmark, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import type { BankAccountDTO } from '@/store/features/user/bankAccount/bankAccount';

const formatAccountNumber = (accountNumber: string) =>
  accountNumber ? `•••• ${accountNumber.slice(-4)}` : '';

export interface BankAccountsProps {
  accounts: BankAccountDTO[];
  handleAddClick: () => void;
}

export const BankAccounts = ({
  accounts,
  handleAddClick,
}: BankAccountsProps) => {
  const { loading } = useSelector((state: RootState) => state.bankAccount);

  return (
    <Card className="border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-foreground">
          <Landmark className="h-5 w-5 text-muted-foreground" />
          Linked accounts
        </h3>

        {/* If accounts exist, show small Add button */}
        {accounts.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddClick}
            className="flex items-center gap-1 text-sm cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add new
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-1">
        {/* Loading state */}
        {loading && (
          <div className="col-span-2 h-24 animate-pulse rounded-lg bg-muted" />
        )}

        {/* Accounts list */}
        {!loading && accounts.length > 0 && (
          <>
            {accounts.map((account: any) => (
              <div
                key={account.id}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-md border border-border bg-background p-2 shadow-sm">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {account.bankName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatAccountNumber(account.accountNumber)} · IFSC{' '}
                      {account.ifsc}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                  Active
                </span>
              </div>
            ))}
          </>
        )}

        {/* Empty state */}
        {!loading && accounts.length === 0 && (
          <button
            type="button"
            onClick={handleAddClick}
            className="col-span-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-muted-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
          >
            <div className="mb-3 rounded-full bg-muted p-3 transition-colors group-hover:bg-primary/10">
              <Plus className="h-6 w-6" />
            </div>
            <p className="font-medium text-foreground">
              No bank account linked
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add an account to enable withdrawals to your bank.
            </p>
          </button>
        )}
      </div>
    </Card>
  );
};
