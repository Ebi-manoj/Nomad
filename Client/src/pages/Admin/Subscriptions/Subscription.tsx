import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Plus, Loader2 } from 'lucide-react';

import { type SubscriptionPlanFormData } from '@/validation/adminSubscription';
import type { AdminSubscriptionPlanDTO } from '@/types/adminSubscription';
import { SubscriptionFormDialog } from './SubscriptionFormDialog';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchAdminSubscriptionPlans } from '@/store/features/admin/subscriptionPlans/adminSubscriptionPlans.thunk';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export const AdminSubscriptionPage = () => {
  const { plans, loading } = useSelector(
    (state: RootState) => state.adminSubscriptionPlans
  );
  const dispatch = useAppDispatch();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] =
    useState<AdminSubscriptionPlanDTO | null>(null);

  useEffect(() => {
    dispatch(fetchAdminSubscriptionPlans());
  }, []);

  const handleEdit = (plan: AdminSubscriptionPlanDTO) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: SubscriptionPlanFormData) => {};

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Subscription Plans
          </h1>
          <p className="text-muted-foreground">
            Manage pricing tiers and features.
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Plan
        </Button>
      </div>

      {/* Data Table */}
      <div className="border rounded-lg bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tier Name</TableHead>
              <TableHead>Price (Mo/Yr)</TableHead>
              <TableHead>Platform Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : plans.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No subscription plans found.
                </TableCell>
              </TableRow>
            ) : (
              plans.map(plan => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold flex items-center gap-2">
                        {plan.tier}
                        {plan.isPopular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {plan.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="font-medium">₹{plan.price.monthly}</span>{' '}
                      /
                      <span className="text-muted-foreground">
                        {' '}
                        ₹{plan.price.yearly}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{plan.features.platformFeePercentage}%</TableCell>
                  <TableCell>
                    <Badge variant={plan.isActive ? 'default' : 'destructive'}>
                      {plan.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(plan)}>
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {plan.isActive ? 'Deactivate' : 'Activate'} Plan
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          Delete Plan
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <SubscriptionFormDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingPlan={editingPlan}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};
