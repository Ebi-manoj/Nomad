import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import type { WalletTransactionDTO } from '@/store/features/user/wallet/wallet.d';
import { formatDate } from '@/utils/dateFormater';

interface TransactionItemProps {
  transaction: WalletTransactionDTO;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isIncome = transaction.type === 'CREDIT';

  const statusColors = {
    completed: 'bg-green-500 text-white ',
    pending: 'bg-warning/10 text-warning border-warning/20',
    failed: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <Card className="p-4 border-border hover:border-foreground/20 transition-colors bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div
            className={`p-2 rounded-full ${
              isIncome ? 'bg-success/10' : 'bg-destructive/10'
            }`}
          >
            {isIncome ? (
              <ArrowDownLeft className="h-5 w-5 text-success" />
            ) : (
              <ArrowUpRight className="h-5 w-5 text-destructive" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium text-foreground">
                {transaction.description}
              </p>
              <Badge variant="outline" className={statusColors['completed']}>
                {'Completed'}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>ID: TXN{transaction.id.slice(-8)}</span>
              <span>•</span>
              <span>{formatDate(transaction.createdAt)}</span>
            </div>
          </div>
        </div>

        <div
          className={`text-right font-semibold text-lg ${
            isIncome ? 'text-success' : 'text-destructive'
          }`}
        >
          {isIncome ? '+' : '-'}₹{Math.abs(transaction.amount).toFixed(2)}
        </div>
      </div>
    </Card>
  );
};
