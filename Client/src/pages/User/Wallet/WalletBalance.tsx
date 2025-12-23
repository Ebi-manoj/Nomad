import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { RootState } from '@/store/store';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { useSelector } from 'react-redux';

export interface WalletBalanceProps {
  canWithDraw: boolean;
}

export const WalletBalance = ({ canWithDraw }: WalletBalanceProps) => {
  const { walletData } = useSelector((state: RootState) => state.wallet);
  const formatAmount = (value: number) => `₹${value.toFixed(2)}`;

  return (
    <Card className="p-6 border-border bg-card shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Wallet className="h-4 w-4" />
            <span className="text-sm font-medium">Total Balance</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            {formatAmount(walletData.balance)}
          </h1>
        </div>
        {canWithDraw && (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-sm cursor-pointer bg-black text-white hover:bg-gray-800 hover:text-white"
          >
            <ArrowUpRight className="h-4 w-4" />
            Withdraw
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-success/5 rounded-lg p-4 border border-success/20">
          <div className="flex items-center gap-2 text-success mb-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium">Income</span>
          </div>
          <p className="text-xl font-semibold text-foreground">
            {formatAmount(walletData.totalCredits)}
          </p>
        </div>

        <div className="bg-destructive/5 rounded-lg p-4 border border-destructive/20">
          <div className="flex items-center gap-2 text-destructive mb-1">
            <TrendingDown className="h-4 w-4" />
            <span className="text-xs font-medium">Expenses</span>
          </div>
          <p className="text-xl font-semibold text-foreground">
            {formatAmount(walletData.totalDebits)}
          </p>
        </div>
      </div>
    </Card>
  );
};
