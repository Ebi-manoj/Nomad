import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, Search, List, Zap, Crown } from 'lucide-react';
import { type SubscriptionPlanFormData } from '@/validation/adminSubscription';
import type { AdminSubscriptionPlanDTO } from '@/types/adminSubscription';
import { SubscriptionFormDialog } from './SubscriptionFormDialog';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  createSubscriptionPlan,
  fetchAdminSubscriptionPlans,
} from '@/store/features/admin/subscriptionPlans/adminSubscriptionPlans.thunk';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Input } from '@/components/ui/input';
import { PlanCard } from './PlanCard';
import { StatsCard } from './StatusCard';
import { toast } from 'sonner';

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

  const handleFormSubmit = async (data: SubscriptionPlanFormData) => {
    try {
      if (!editingPlan) {
        await dispatch(createSubscriptionPlan(data)).unwrap();
        toast.success('Subscription plan created successfully');
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <div className="min-h-screen bg-white p-6 md:p-2 space-y-8">
      {/* 1. Modern Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Subscription Plans
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage pricing tiers, feature sets, and active limits.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search plans..."
              className="pl-9 bg-background"
            />
          </div>
          <Button
            onClick={handleCreate}
            className="gap-2 shadow-md cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Create Plan
          </Button>
        </div>
      </div>

      {/* 2. Stats Overview (Optional but looks great) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          label="Total Plans"
          value={plans.length.toString()}
          icon={<List className="text-blue-500" />}
        />
        <StatsCard
          label="Active Plans"
          value={plans.filter(p => p.isActive).length.toString()}
          icon={<Zap className="text-green-500" />}
        />
        <StatsCard
          label="Popular Tier"
          value={plans.find(p => p.isPopular)?.tier || 'None'}
          icon={<Crown className="text-amber-500" />}
        />
      </div>

      {/* 3. The Grid View (Replacing the Table) */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed">
          <p className="text-muted-foreground">No plans configured yet.</p>
          <Button variant="link" onClick={handleCreate}>
            Create your first plan
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => handleEdit(plan)}
              onDelete={() => {}}
              onToggleActive={() => {}}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <SubscriptionFormDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        editingPlan={editingPlan}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};
