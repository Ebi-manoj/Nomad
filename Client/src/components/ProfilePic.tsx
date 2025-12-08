import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { SubscriptionTierType } from '@/types/subscription';
import { MdWorkspacePremium } from 'react-icons/md';
import { GiMountainClimbing, GiFullMotorcycleHelmet } from 'react-icons/gi';

interface UserAvatarProps {
  fullName: string;
  imageUrl?: string;
  subscriptionTier?: SubscriptionTierType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

const sizeClasses = {
  sm: 'size-8',
  md: 'size-12',
  lg: 'size-16',
  xl: 'size-20',
};

const tierColorMap = {
  FREE: 'bg-gray-500 text-white',
  HIKER_PRO: 'bg-green-500 text-white',
  RIDER_PRO: 'bg-blue-500 text-white',
  PREMIUM_PLUS: 'bg-amber-500 text-white',
};

const tierStyles = {
  FREE: 'border-gray-300 ring-gray-200',
  HIKER_PRO: 'border-green-400 ring-green-200',
  RIDER_PRO: 'border-blue-400 ring-blue-200',
  PREMIUM_PLUS: 'border-amber-400 ring-amber-200',
};

const tierBadges = {
  FREE: null,
  HIKER_PRO: GiMountainClimbing,
  RIDER_PRO: GiFullMotorcycleHelmet,
  PREMIUM_PLUS: MdWorkspacePremium,
};

export const UserAvatar = ({
  fullName,
  imageUrl,
  subscriptionTier = 'FREE',
  size = 'md',
  className,
  showBadge = false,
}: UserAvatarProps) => {
  const initials = fullName
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase();

  const BadgeIcon = tierBadges[subscriptionTier];
  const badgeColorClass = tierColorMap[subscriptionTier];
  const badgeSize = size === 'sm' ? 10 : size === 'md' ? 12 : 14;
  const badgeContainerSize = size === 'sm' ? 'size-4' : 'size-5';
  const badgePosition =
    size === 'sm' ? '-bottom-0.5 -right-0.5' : 'bottom-1 -right-1';

  return (
    <div className="relative inline-block">
      <Avatar
        className={cn(
          sizeClasses[size],
          'border-2 ring-1',
          tierStyles[subscriptionTier],
          className
        )}
      >
        <AvatarImage alt={`${fullName} profile photo`} src={imageUrl} />
        <AvatarFallback className="font-semibold">{initials}</AvatarFallback>
      </Avatar>
      {showBadge && BadgeIcon && (
        <span
          className={cn(
            'absolute flex items-center justify-center rounded-full border-2 border-white shadow-md',
            badgeContainerSize,
            badgePosition,
            badgeColorClass
          )}
        >
          <BadgeIcon size={badgeSize} strokeWidth={2.5} />
        </span>
      )}
    </div>
  );
};
