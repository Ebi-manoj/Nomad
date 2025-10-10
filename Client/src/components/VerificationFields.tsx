import { ShieldCheck, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { imageSchema, type imageSchemaType } from '@/validation/image';
import { zodResolver } from '@hookform/resolvers/zod';

type docType = 'aadhaar' | 'license';

interface VerificationModalProps {
  type: docType | null;
  open: boolean;
  onClose: () => void;
}

interface verifyItemProps {
  label: string;
  status: 'verified' | 'not verified';
  onVerify: () => void;
}

export function VerificationSection() {
  const [modalType, setModalType] = useState<docType | null>(null);

  const openModal = (type: docType) => setModalType(type);
  const closeModal = () => setModalType(null);

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
        <VerifyItem
          label="AADHAR VERIFIED"
          status="not verified"
          onVerify={() => openModal('aadhaar')}
        />
        <VerifyItem
          label="LICENCE VERIFIED"
          status="not verified"
          onVerify={() => openModal('license')}
        />
      </ul>
      <VerificationModal
        type={modalType}
        onClose={closeModal}
        open={!!modalType}
      />
    </section>
  );
}

function VerifyItem({ label, status, onVerify }: verifyItemProps) {
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
          <Button
            size="sm"
            variant="secondary"
            className="px-3 cursor-pointer"
            onClick={onVerify}
          >
            verify
          </Button>
        )}
      </div>
    </li>
  );
}

export const VerificationModal = ({
  type,
  open,
  onClose,
}: VerificationModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<imageSchemaType>({ resolver: zodResolver(imageSchema) });

  if (!type) return null;

  function onSubmit(data: imageSchemaType) {
    console.log(data);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === 'aadhaar'
              ? 'Aadhaar Verification'
              : 'License Verification'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please upload your {type} card photo for verification.
          </p>

          <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <Upload className="size-6 text-gray-500" aria-hidden="true" />
            <input
              type="file"
              accept="image/*"
              {...register('file')}
              className="w-full text-sm text-gray-900 cursor-pointer file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
            />
          </div>
          {errors.file && (
            <p className="text-red-600 text-sm">
              {errors.file?.message?.toString()}
            </p>
          )}

          <Button className="w-full mt-2 cursor-pointer" type="submit">
            Upload & Verify
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
