import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  X,
  Building2,
  CreditCard,
  User,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  ShieldCheck,
  Eye,
  EyeOff,
  Landmark,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  bankAccountSchema,
  type BankAccountFormData,
} from '@/validation/AddBankAccount';
import { useIFSCVerification } from '@/hooks/useIFSCVerify';

interface AddBankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddBankAccountModal = ({
  isOpen,
  onClose,
}: AddBankAccountModalProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
    mode: 'onBlur',
    defaultValues: {
      accountType: 'savings',
    },
  });

  const ifscCode = watch('ifscCode');
  const accountType = watch('accountType');

  const {
    bankDetails,
    isVerifying,
    error: ifscError,
  } = useIFSCVerification(ifscCode || '');

  const onSubmit = async (data: BankAccountFormData) => {
    if (ifscError || !bankDetails) {
      toast.error('Please enter a valid IFSC code');
      return;
    }
    const { confirmAccountNumber, ...payload } = data;

    console.log('Submitting:', payload);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header - Compact & Clean */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-1">
              <Landmark />
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Link Bank Account
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Secure 256-bit encrypted connection
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto px-6 py-6 custom-scrollbar">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Account Type - Modern Segmented Control */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Account Type
              </label>
              <div className="flex p-1 bg-gray-100/80 rounded-lg border border-gray-200">
                {['savings', 'current'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setValue('accountType', type as 'savings' | 'current')
                    }
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      accountType === type
                        ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                    }`}
                  >
                    {type === 'savings' ? 'Savings' : 'Current'}
                    {accountType === type && (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Account Holder Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Account Holder Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  {...register('accountHolderName')}
                  type="text"
                  placeholder="e.g. John Doe"
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all ${
                    errors.accountHolderName
                      ? 'border-red-300 bg-red-50/50'
                      : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.accountHolderName && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  {errors.accountHolderName.message}
                </p>
              )}
            </div>

            {/* Account Number Group */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <div className="relative group">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    {...register('accountNumber')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="0000 0000 0000"
                    className={`w-full pl-10 pr-10 py-2.5 bg-gray-50 border rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all ${
                      errors.accountNumber
                        ? 'border-red-300 bg-red-50/50'
                        : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.accountNumber && (
                  <p className="text-xs text-red-500">
                    {errors.accountNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Confirm Account Number
                </label>
                <div className="relative group">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    {...register('confirmAccountNumber')}
                    type="text"
                    placeholder="Re-enter account number"
                    onPaste={e => e.preventDefault()} // Security best practice
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all ${
                      errors.confirmAccountNumber
                        ? 'border-red-300 bg-red-50/50'
                        : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.confirmAccountNumber && (
                  <p className="text-xs text-red-500">
                    {errors.confirmAccountNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* IFSC Code Section */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                IFSC Code
              </label>
              <div className="relative group">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  {...register('ifscCode')}
                  type="text"
                  placeholder="SBIN0001234"
                  maxLength={11}
                  className={`w-full pl-10 pr-10 py-2.5 bg-gray-50 border rounded-lg outline-none uppercase font-medium focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all ${
                    errors.ifscCode || ifscError
                      ? 'border-red-300 bg-red-50/50'
                      : bankDetails
                      ? 'border-green-400 bg-green-50/30'
                      : 'border-gray-200'
                  }`}
                />

                {/* Status Icons inside Input */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isVerifying && (
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                  )}
                  {!isVerifying && bankDetails && (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                  {!isVerifying && ifscError && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>

              {/* Validation Messages */}
              {(errors.ifscCode || ifscError) && (
                <p className="text-xs text-red-500">
                  {errors.ifscCode?.message || ifscError}
                </p>
              )}

              {/* Modern Success State - "Found Bank" */}
              {!isVerifying && bankDetails && (
                <div className="mt-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
                  <div className="bg-green-100 p-1.5 rounded-md">
                    <Building2 className="w-4 h-4 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {bankDetails.bank}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {bankDetails.branch}, {bankDetails.city}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Info / Submit */}
            <div className="pt-2">
              <div className="flex items-start gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  We will deposit <span className="font-bold">₹1</span> to
                  verify your account. It will be refunded automatically.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isSubmitting || isVerifying || !!ifscError || !bankDetails
                  }
                  className="flex-[2] px-4 py-2.5 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Add & Verify'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
