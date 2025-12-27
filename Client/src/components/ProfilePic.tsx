import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { MdWorkspacePremium } from 'react-icons/md';
import { GiMountainClimbing, GiFullMotorcycleHelmet } from 'react-icons/gi';

interface UserAvatarProps {
  fullName: string;
  imageUrl?: string;
  subscriptionTier?: string;
  badgeColor?: string;
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

const getTierIcon = (tier: string) => {
  const t = tier.toUpperCase();
  if (t.includes('PREMIUM')) return MdWorkspacePremium;
  if (t.includes('HIKER')) return GiMountainClimbing;
  if (t.includes('RIDER')) return GiFullMotorcycleHelmet;
  return null;
};

const lightenColor = (hex: string, percent: number = 40): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(
    255,
    Math.floor((num >> 16) + ((255 - (num >> 16)) * percent) / 100)
  );
  const g = Math.min(
    255,
    Math.floor(
      ((num >> 8) & 0x00ff) + ((255 - ((num >> 8) & 0x00ff)) * percent) / 100
    )
  );
  const b = Math.min(
    255,
    Math.floor((num & 0x0000ff) + ((255 - (num & 0x0000ff)) * percent) / 100)
  );
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

export const UserAvatar = ({
  fullName,
  imageUrl,
  subscriptionTier = 'FREE',
  badgeColor,
  size = 'md',
  className,
  showBadge = false,
}: UserAvatarProps) => {
  const initials = fullName
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const BadgeIcon = getTierIcon(subscriptionTier);

  const badgeSize = size === 'sm' ? 10 : size === 'md' ? 12 : 14;
  const badgeContainerSize = size === 'sm' ? 'size-4' : 'size-5';
  const badgePosition =
    size === 'sm' ? '-bottom-0.5 -right-0.5' : 'bottom-1 -right-1';

  const shouldShowBadge = showBadge && BadgeIcon && subscriptionTier !== 'FREE';

  // Generate border and ring colors from badgeColor
  const borderColor = badgeColor || '#d1d5db';
  const ringColor = lightenColor(borderColor, 60);

  return (
    <div className="relative inline-block">
      <Avatar
        className={cn(sizeClasses[size], 'border-2 ring-1', className)}
        style={{
          borderColor: borderColor,
          boxShadow: `0 0 0 1px ${ringColor}`,
        }}
      >
        <AvatarImage alt={`${fullName} profile photo`} src={imageUrl} />
        <AvatarFallback className="font-semibold">{initials}</AvatarFallback>
      </Avatar>

      {shouldShowBadge && (
        <span
          className={cn(
            'absolute flex items-center justify-center rounded-full border-2 border-white shadow-md text-white',
            badgeContainerSize,
            badgePosition
          )}
          style={{ backgroundColor: badgeColor }}
        >
          <BadgeIcon size={badgeSize} />
        </span>
      )}
    </div>
  );
};
