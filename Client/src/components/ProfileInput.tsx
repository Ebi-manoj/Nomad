import { cn } from '@/lib/utils';

export const Field = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </span>
      <div
        className={cn(
          'flex items-center justify-between rounded-md border border-input bg-muted/60',
          'px-3 py-2 text-sm'
        )}
      >
        <span className="truncate font-medium">{value}</span>
      </div>
    </label>
  );
};
