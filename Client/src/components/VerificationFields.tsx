import { ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function VerificationSection() {
  return (
    <section aria-labelledby="verification" className="space-y-4">
      <h2 id="verification" className="text-lg font-semibold">
        Profile verification
      </h2>
      <p className="text-sm text-muted-foreground">
        Complete KYC verification to enhance credibility and access ride
        features.
      </p>

      <ul className="mt-4 grid gap-3">
        <VerifyItem label="AADHAR VERIFIED" status="not verified" />
        <VerifyItem label="LICENCE VERIFIED" status="not verified" />
      </ul>
    </section>
  );
}

function VerifyItem({
  label,
  status,
}: {
  label: string;
  status: 'verified' | 'not verified';
}) {
  const isVerified = status === 'verified';
  return (
    <li className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
      <div className="flex items-center gap-3">
        <ShieldCheck
          className={cn(
            'size-5',
            isVerified ? 'text-chart-2' : 'text-muted-foreground'
          )}
          aria-hidden="true"
        />
        <div className="text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">
            {isVerified ? 'verified' : 'not verified'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isVerified ? (
          <span className="rounded-md bg-chart-2/10 px-2 py-1 text-xs font-medium text-chart-2">
            Verified
          </span>
        ) : (
          <Button size="sm" variant="secondary" className="px-3 cursor-pointer">
            verify
          </Button>
        )}
      </div>
    </li>
  );
}
