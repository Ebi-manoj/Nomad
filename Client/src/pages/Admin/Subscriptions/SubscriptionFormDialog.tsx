import { useForm, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, CheckCircle2, Crown } from 'lucide-react';

import {
  subscriptionPlanSchema,
  type SubscriptionPlanFormData,
} from '@/validation/adminSubscription';
import type { AdminSubscriptionPlanDTO } from '@/types/adminSubscription';

interface SubscriptionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingPlan: AdminSubscriptionPlanDTO | null;
  onSubmit: (data: SubscriptionPlanFormData) => Promise<void>;
}

export function SubscriptionFormDialog({
  open,
  onOpenChange,
  editingPlan,
  onSubmit,
}: SubscriptionFormDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SubscriptionPlanFormData>({
    resolver: zodResolver(subscriptionPlanSchema),
    defaultValues: {
      isPopular: false,
      isActive: false,
      features: {
        verificationBadge: false,
        customCostSharing: false,
        priorityInList: false,
      },
    },
  });
  const onError = (errors: FieldErrors<SubscriptionPlanFormData>) => {
    console.log('Form validation errors:', errors);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingPlan ? 'Edit Subscription Plan' : 'Create New Plan'}
          </DialogTitle>
          <DialogDescription>
            Configure the pricing, features, and limits for this tier.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-6 mt-4"
        >
          {/* Section 1: Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tier Name</label>
              <Input placeholder="e.g. PRO_HIKER" {...register('tier')} />
              {errors.tier && (
                <p className="text-xs text-red-500">{errors.tier.message}</p>
              )}
            </div>

            <div className="flex items-end gap-4 pb-2">
              <div className="flex items-center space-x-2 border p-2 rounded-md w-full">
                <Controller
                  name="isPopular"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <label
                  htmlFor="isPopular"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Mark as Popular
                </label>
              </div>
              <div className="flex items-center space-x-2 border p-2 rounded-md w-full">
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="isActive"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />

                <label
                  htmlFor="isActive"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Active Status
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              placeholder="Short description for the UI card"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Section 2: Pricing */}
          <div className="space-y-4 border rounded-md p-4 bg-muted/20">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Crown size={16} /> Pricing
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">
                  Monthly Price (₹)
                </label>
                <Input
                  type="number"
                  {...register('price.monthly', { valueAsNumber: true })}
                />
                {errors.price?.monthly && (
                  <p className="text-xs text-red-500">
                    {errors.price.monthly.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">
                  Yearly Price (₹)
                </label>
                <Input
                  type="number"
                  {...register('price.yearly', { valueAsNumber: true })}
                />
                {errors.price?.yearly && (
                  <p className="text-xs text-red-500">
                    {errors.price.yearly.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Features Config */}
          <div className="space-y-4 border rounded-md p-4 bg-muted/20">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <CheckCircle2 size={16} /> Features Configuration
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">
                  Max Join Requests
                </label>
                <Input
                  type="number"
                  {...register('features.maxJoinRequestsPerRide', {
                    valueAsNumber: true,
                  })}
                />
                {errors.features?.maxJoinRequestsPerRide && (
                  <p className="text-xs text-red-500">
                    {errors.features?.maxJoinRequestsPerRide.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">
                  Max Acceptances/Mo
                </label>
                <Input
                  type="number"
                  {...register('features.maxRideAcceptancesPerMonth', {
                    valueAsNumber: true,
                  })}
                />
                {errors.features?.maxRideAcceptancesPerMonth && (
                  <p className="text-xs text-red-500">
                    {errors.features.maxRideAcceptancesPerMonth.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">
                  Platform Fee (%)
                </label>
                <Input
                  type="number"
                  {...register('features.platformFeePercentage', {
                    valueAsNumber: true,
                  })}
                />
                {errors.features?.platformFeePercentage && (
                  <p className="text-xs text-red-500">
                    {errors.features.platformFeePercentage.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-2">
                <Controller
                  name="features.verificationBadge"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="verificationBadge"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <label htmlFor="verificationBadge" className="text-sm">
                  Verification Badge
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  name="features.priorityInList"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="priorityInList"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <label htmlFor="priorityInList" className="text-sm">
                  Priority Listing
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  name="features.customCostSharing"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="customCostSharing"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <label htmlFor="customCostSharing" className="text-sm">
                  Custom Cost Sharing
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : null}
              {editingPlan ? 'Update Plan' : 'Create Plan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
