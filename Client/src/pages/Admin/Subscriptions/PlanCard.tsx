import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { AdminSubscriptionPlanDTO } from '@/types/adminSubscription';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, MoreVertical, ShieldCheck, X, Zap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

interface PlanCardProps {
  plan: AdminSubscriptionPlanDTO;
  onEdit: () => void;
  onToggleActive: () => void;
  onDelete: () => void;
}

export const PlanCard = ({
  plan,
  onEdit,
  onToggleActive,
  onDelete,
}: PlanCardProps) => {
  const formatFeatureName = (key: string) => {
    return key
      .replace(/^_/, '')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };
  const formatFeatureValue = (value: boolean | number | null) => {
    if (typeof value === 'boolean') return null;
    if (value === null) return ':Unlimited';
    if (value === 0) return ':Not available';
    return value;
  };

  return (
    <Card
      className={cn(
        'relative flex flex-col transition-all duration-200 hover:shadow-lg border-2',
        plan.isPopular
          ? 'border-amber-400 bg-white'
          : 'border-transparent bg-card'
      )}
    >
      {plan.isPopular && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary shadow-sm">
            <Crown className="w-3 h-3 mr-1" /> Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <h3 className="font-bold text-xl">{plan.tier}</h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 h-10 break-words overflow-hidden">
              {plan.description}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="-mr-2 h-8 w-8 cursor-pointer"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                Edit Details
              </DropdownMenuItem>
              {!plan.isDefault && (
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-red-600 cursor-pointer"
                >
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {/* Pricing */}
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">₹{plan.price.monthly}</span>
          <span className="text-muted-foreground">/mo</span>
          {plan.price.yearly > 0 && (
            <span className="text-xs text-muted-foreground ml-2 px-2 py-0.5 rounded-full bg-muted">
              ₹{plan.price.yearly}/yr
            </span>
          )}
        </div>

        <Separator />

        {/* Features List */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
            Features
          </p>
          <ul className="space-y-2.5">
            {Object.entries(plan.features).map(([key, value]) => (
              <li key={key} className="flex items-start gap-2.5 text-sm group">
                {/* Logic to choose icon based on boolean or value */}
                {typeof value === 'boolean' ? (
                  value ? (
                    <div className="mt-0.5 rounded-full bg-green-100 p-0.5 dark:bg-green-900/30">
                      <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                    </div>
                  ) : (
                    <div className="mt-0.5 rounded-full bg-gray-100 p-0.5 dark:bg-gray-800">
                      <X className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  )
                ) : (
                  <div className="mt-0.5 rounded-full bg-blue-100 p-0.5 dark:bg-blue-900/30">
                    <Zap className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  </div>
                )}

                <span
                  className={cn(
                    'text-foreground/90',
                    typeof value === 'boolean' &&
                      !value &&
                      'text-muted-foreground line-through decoration-muted-foreground/50'
                  )}
                >
                  {/* Smart Text Formatting */}
                  {formatFeatureName(key)}

                  <span className="font-semibold ml-1">
                    {formatFeatureValue(value)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t bg-muted/20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Status:
          </span>
          <Badge
            variant={plan.isActive ? 'default' : 'secondary'}
            className={cn(
              plan.isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500'
            )}
          >
            {plan.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        {!plan.isDefault && (
          <div className="flex items-center gap-2">
            <Switch
              checked={true}
              onCheckedChange={onToggleActive}
              className="scale-75 data-[state=checked]:bg-green-600"
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
