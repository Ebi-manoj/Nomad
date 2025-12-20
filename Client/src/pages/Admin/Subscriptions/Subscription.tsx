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
  deleteSubscriptionPlan,
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

interface ConfirmationModalType {
  title: string;
  subtitle: string;
  onClick: () => void;
}

export const AdminSubscriptionPage = () => {
  const { plans, loading } = useSelector(
    (state: RootState) => state.adminSubscriptionPlans
  );
  const dispatch = useAppDispatch();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState<AdminSubscriptionPlanDTO | null>(
    null
  );
  const [selectedPlan, setSelectedPlan] =
    useState<AdminSubscriptionPlanDTO | null>(null);
  const [editingPlan, setEditingPlan] =
    useState<AdminSubscriptionPlanDTO | null>(null);
  const [confirmModalContent, setConfirmModalContent] =
    useState<ConfirmationModalType>({
      title: '',
      subtitle: '',
      onClick: () => {},
    });

  useEffect(() => {
    dispatch(fetchAdminSubscriptionPlans());
  }, []);

  useEffect(() => {
    let title = '';
    let subtitle = '';
    let onClick = () => {};
    if (isDeleted) {
      title = 'Delete Subscription Plan';
      subtitle = 'Are you sure want to Delete this plan';
      onClick = onDelete;
    }
    if (selectedPlan) {
      title = selectedPlan.isActive
        ? 'Deactivate Subscription Plan'
        : 'Activate Subscription Plan';
      subtitle = `Are you sure you want to ${
        selectedPlan?.isActive ? 'deactivate' : 'activate'
      } this plan?`;
      onClick = onToggleActive;
    }
    setConfirmModalContent({ title, subtitle, onClick });
  }, [isDeleted, selectedPlan]);

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
  const deleteConfirmationReq = (plan: AdminSubscriptionPlanDTO) => {
    setIsDeleted(plan);
    setConfirmModal(true);
  };

  const onToggleActive = async () => {
    if (!selectedPlan) return;
    try {
      await dispatch(toggleSubscriptionPlanStatus(selectedPlan.id)).unwrap();
      toast.success('Updated plan status successfully');
    } catch (error) {
      toast.error(error as string);
    } finally {
      setSelectedPlan(null);
      setConfirmModal(false);
    }
  };

  const onDelete = async () => {
    if (!isDeleted) return;
    try {
      await dispatch(deleteSubscriptionPlan(isDeleted.id)).unwrap();
      toast.success('Deleted plan  successfully');
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsDeleted(null);
      setConfirmModal(false);
    }
  };
  const onCloseModal = () => {
    setConfirmModal(false);
    setSelectedPlan(null);
    setIsDeleted(null);
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
              onDelete={() => deleteConfirmationReq(plan)}
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
        onClose={onCloseModal}
        title={confirmModalContent.title}
        titleIcon={<ShieldAlert />}
        subtitle={confirmModalContent.subtitle}
        primaryAction={{
          label: 'Confirm',
          className:
            selectedPlan?.isActive || isDeleted
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-emerald-400 hover:bg-emerald-300',
          onClick: confirmModalContent.onClick,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: onCloseModal,
        }}
      >
        <p className="text-sm text-gray-600">
          This plan will immediately hidden from users.
        </p>
      </GenericModal>
    </div>
  );
};
