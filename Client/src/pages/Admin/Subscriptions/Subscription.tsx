import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Loader2,
  Search,
  List,
  Zap,
  Crown,
  ShieldAlert,
} from 'lucide-react';
import { type SubscriptionPlanFormData } from '@/validation/adminSubscription';
import type {
  AdminSubscriptionPlanDTO,
  EditSubscriptionPlanDTO,
} from '@/types/adminSubscription';
import { SubscriptionFormDialog } from './SubscriptionFormDialog';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  createSubscriptionPlan,
  editSubscriptionPlan,
  fetchAdminSubscriptionPlans,
  toggleSubscriptionPlanStatus,
} from '@/store/features/admin/subscriptionPlans/adminSubscriptionPlans.thunk';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Input } from '@/components/ui/input';
import { PlanCard } from './PlanCard';
import { StatsCard } from './StatusCard';
import { toast } from 'sonner';
import { GenericModal } from '@/components/GenericModel';

export const AdminSubscriptionPage = () => {
  const { plans, loading } = useSelector(
    (state: RootState) => state.adminSubscriptionPlans
  );
  const dispatch = useAppDispatch();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedPlan, setSelectedPlan] =
    useState<AdminSubscriptionPlanDTO | null>(null);
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

  const handleFormSubmit = async (
    data: SubscriptionPlanFormData
  ): Promise<boolean> => {
    try {
      if (!editingPlan) {
        await dispatch(createSubscriptionPlan(data)).unwrap();
        toast.success('Subscription plan created successfully');
      } else {
        const dto: EditSubscriptionPlanDTO = {
          id: editingPlan.id,
          isDefault: editingPlan.isDefault,
          ...data,
        };
        await dispatch(editSubscriptionPlan(dto)).unwrap();
        toast.success('Subscription plan created successfully');
      }
      return true;
    } catch (error) {
      toast.error(error as string);
      return false;
    }
  };

  const toggleConfirmationReq = (plan: AdminSubscriptionPlanDTO) => {
    setSelectedPlan(plan);
    setConfirmModal(true);
  };

  const onToggleActive = async () => {
    if (!selectedPlan) return;
    try {
      await dispatch(toggleSubscriptionPlanStatus(selectedPlan.id)).unwrap();
      toast.success('Updated plan satus successfully');
    } catch (error) {
      toast.error(error as string);
    } finally {
      setConfirmModal(false);
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
              onToggleActive={() => toggleConfirmationReq(plan)}
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

      <GenericModal
        isOpen={confirmModal}
        onClose={() => {
          setConfirmModal(false);
          setSelectedPlan(null);
        }}
        title={
          selectedPlan?.isActive
            ? 'Deactivate Subscription Plan'
            : 'Activate Subscription Plan'
        }
        titleIcon={<ShieldAlert />}
        subtitle={`Are you sure you want to ${
          selectedPlan?.isActive ? 'deactivate' : 'activate'
        } this plan?`}
        primaryAction={{
          label: selectedPlan?.isActive ? 'Deactivate' : 'Activate',
          className: selectedPlan?.isActive
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-emerald-400 hover:bg-emerald-300',
          onClick: onToggleActive,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => {
            setConfirmModal(false);
            setSelectedPlan(null);
          },
        }}
      >
        <p className="text-sm text-gray-600">
          This action will immediately hidden from users.
        </p>
      </GenericModal>
    </div>
  );
};
