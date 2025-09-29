import { SubmitBtn } from '../../components/Auth/SubmitBtn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyOTPSchema } from '../../validation/auth';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '../../components/ui/input-otp';

export const VerifyOTP = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ otp: string }>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: { otp: '' },
  });

  function onSubmit(data: { otp: string }) {
    console.log('OTP submitted:', data.otp);
  }

  return (
    <>
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 leading-tight text-pretty">
          Verify your OTP
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Enter the 6-digit code we sent to your email
        </p>
        <p className="mt-4 text-sm font-medium text-black">2:00</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        className="mt-6 grid gap-4"
      >
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          onChange={val => setValue('otp', val, { shouldValidate: true })}
        >
          <InputOTPGroup className="flex gap-2 justify-center mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-10 h-12 text-lg text-center border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {errors.otp && (
          <p className="text-red-500 text-xs mx-auto">{errors.otp.message}</p>
        )}

        <SubmitBtn text="Verify" />

        <p className="text-center text-sm text-slate-400">
          Didn’t get the code?
          <button
            type="button"
            className="text-black hover:text-gray-600 font-medium ml-1 underline cursor-pointer"
            onClick={() => console.log('Resend OTP clicked')}
          >
            Resend
          </button>
        </p>
        <p className="text-center text-xs text-slate-400 mt-2">
          We’ve sent a 6-digit verification code to{' '}
          <span className="font-medium">ema@gmail.com</span>. Please check your
          inbox and spam folder.
        </p>
      </form>
    </>
  );
};
