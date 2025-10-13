import { ShieldCheck, Upload } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { docSchema, type docSchemaType } from '@/validation/docSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import axiosInstance from '@/utils/axiosInstance';
import { PRESIGNED_URL_API } from '@/api/documents';
import axios, { isAxiosError } from 'axios';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  fetchDocs,
  uploadDocs,
} from '@/store/features/user/documents/docs.thunk';
import type { uploadDocsRequest } from '@/store/features/user/documents/doc';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { toast } from 'sonner';
import { SubmitBtn } from './SubmitBtn';
import { ErrorMessage, FolderTypes } from '@/utils/constants';

type docType = 'aadhaar' | 'license';

interface VerificationModalProps {
  type: docType | null;
  open: boolean;
  onClose: () => void;
}

///////////////////////////////////////////////////////
///Verification section

export function VerificationSection() {
  const [modalType, setModalType] = useState<docType | null>(null);
  const { documents } = useSelector((state: RootState) => state.documents);
  console.log(documents);
  const dispatch = useAppDispatch();
  const openModal = (type: docType) => setModalType(type);
  const closeModal = () => setModalType(null);
  useEffect(() => {
    const loadDocs = async () => {
      await dispatch(fetchDocs()).unwrap();
    };
    loadDocs();
  }, []);
  const aadharDoc = documents.find(doc => doc.type == 'aadhaar');
  const licenseDoc = documents.find(doc => doc.type == 'license');
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
          status={`${aadharDoc ? aadharDoc.status : 'not verified'}`}
          onVerify={() => openModal('aadhaar')}
        />
        <VerifyItem
          label="LICENCE VERIFIED"
          status={`${licenseDoc ? licenseDoc.status : 'not verified'}`}
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

////////////////////////////////////////////////////////////
////Verification Item
interface verifyItemProps {
  label: string;
  status: 'not verified' | 'pending' | 'verified' | 'rejected';
  onVerify: () => void;
}

function VerifyItem({ label, status, onVerify }: verifyItemProps) {
  // Determine styling and content based on status
  const shieldColor =
    status === 'verified'
      ? 'text-chart-2'
      : status === 'pending'
      ? 'text-yellow-500'
      : status === 'rejected'
      ? 'text-red-500'
      : 'text-muted-foreground';

  const showButton = status === 'not verified';
  const showPending = status === 'pending';
  const showVerified = status === 'verified';
  const showRejected = status === 'rejected';

  return (
    <li className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
      <div className="flex items-center gap-3">
        <ShieldCheck className={`size-5 ${shieldColor}`} aria-hidden="true" />
        <div className="text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">
            {status === 'pending'
              ? 'pending'
              : status === 'verified'
              ? 'verified'
              : status === 'rejected'
              ? 'rejected'
              : 'not verified'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {showVerified && (
          <span className="rounded-md bg-chart-2/10 px-2 py-1 text-xs font-medium text-chart-2">
            Verified
          </span>
        )}
        {showPending && (
          <span className="rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-500">
            Pending
          </span>
        )}
        {showRejected && (
          <Button
            size="sm"
            variant="secondary"
            className="px-3 cursor-pointer"
            onClick={onVerify}
          >
            Verify again
          </Button>
        )}
        {showButton && (
          <Button
            size="sm"
            variant="secondary"
            className="px-3 cursor-pointer"
            onClick={onVerify}
          >
            Verify
          </Button>
        )}
      </div>
    </li>
  );
}

///////////////////////////////////////////////////////
////Verification Modal

export const VerificationModal = ({
  type,
  open,
  onClose,
}: VerificationModalProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<docSchemaType>({ resolver: zodResolver(docSchema) });

  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  if (!type) return null;

  async function onSubmit(data: docSchemaType) {
    console.log(data);
    const file = data.file?.[0];
    if (!file) return;
    const fileName = file.name;
    const fileType = file.type;

    try {
      const signedURL = await axiosInstance.post(PRESIGNED_URL_API, {
        fileName,
        fileType,
        type: FolderTypes.DOCUMENT,
      });
      const { uploadURL, fileURL } = signedURL.data.data;

      await axios.put(uploadURL, file, {
        headers: {
          'Content-Type': fileType,
        },
      });

      const reqDto: uploadDocsRequest = {
        userId: user?.id!,
        fileURL,
        doc_number: data.doc_number,
        type: type!,
      };
      await dispatch(uploadDocs(reqDto)).unwrap();
      onClose();
      reset();
      toast.success('Document uploaded successfully');
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        toast.error(
          error.response?.data.error.message ||
            ErrorMessage.SOMETHING_WENT_WRONG
        );
        return;
      }
      toast.error(typeof error == 'string' && error);
    }
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
          <DialogDescription className="text-sm text-muted-foreground mt-6">
            Please upload your {type} card photo for verification.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="doc_number"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Document Number
            </label>
            <input
              type="text"
              id="doc_number"
              placeholder={`Enter ${type} Number`}
              {...register('doc_number')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.doc_number && (
              <p className="text-red-600 text-sm mt-1">
                {errors.doc_number.message?.toString()}
              </p>
            )}
          </div>
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

          <SubmitBtn text="Upload & Verify" isLoading={isSubmitting} />
        </form>
      </DialogContent>
    </Dialog>
  );
};
