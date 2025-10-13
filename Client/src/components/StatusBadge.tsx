type Status = 'Pending' | 'Verified' | 'Rejected';

export function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { bg: string; fg: string; label: string }> = {
    Pending: {
      bg: 'var(--color-chart-4)',
      fg: 'var(--color-chart-4)',
      label: 'Pending',
    },
    Verified: {
      bg: 'var(--color-chart-2)',
      fg: 'var(--color-chart-2)',
      label: 'Verified',
    },
    Rejected: {
      bg: 'var(--color-destructive)',
      fg: 'var(--color-destructive)',
      label: 'Rejected',
    },
  };

  const c = map[status];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: `color-mix(in oklab, ${c.bg} 18%, transparent)`,
        color: c.fg,
        border: `1px solid color-mix(in oklab, ${c.fg} 30%, transparent)`,
      }}
      aria-label={`Status: ${c.label}`}
    >
      {c.label}
    </span>
  );
}
