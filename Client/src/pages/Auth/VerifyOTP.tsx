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

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendOTP } from '@/hooks/useSendOTP';
import axiosInstance from '@/utils/axiosInstance';
import { useHandleApiError } from '@/hooks/useHandleApiError';

export const VerifyOTP = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [remainingSeconds, setSeconds] = useState(0);
  const [expired, setExpired] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ otp: string }>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: { otp: '' },
  });

  function initiliazeTimer() {
    const sessionDetails = sessionStorage.getItem('otpDetails');

    if (!sessionDetails) {
      navigate('/auth/sign-up');
      return;
    }
    const otpDetails: { email: string; expiry: number } =
      JSON.parse(sessionDetails);
    const expiryLeft = (otpDetails.expiry - Date.now()) / 1000;
    setSeconds(Math.floor(expiryLeft));
    setEmail(otpDetails.email);
    setExpired(Math.floor(expiryLeft) <= 0);
  }

  async function onSubmit(data: { otp: string }) {
    console.log(data);
    try {
      if (!email) return;
      const requestDTO: { otp: string; email: string } = { ...data, email };
      const res = await axiosInstance.post('/auth/verify-otp', requestDTO);
      const resData = res.data.data;
      sessionStorage.removeItem('otpDetails');
      navigate('/auth/details', {
        state: { email, token: resData.verificationToken },
      });
    } catch (error) {
      useHandleApiError(error);
    }
  }

  async function resendOTP() {
    if (!email) return;
    try {
      setIsResending(true);
      const result = await useSendOTP({ email });
      if (!result.success) return;
      initiliazeTimer();
    } finally {
      setIsResending(false);
    }
  }

  useEffect(() => {
    initiliazeTimer();
  }, [navigate]);

  useEffect(() => {
    if (remainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          setExpired(true);
          sessionStorage.removeItem('otpDetails');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return (
    <>
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 leading-tight text-pretty">
          Verify your OTP
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Enter the 6-digit code we sent to your email
        </p>

        {!expired && (
          <p className="mt-4 text-sm font-medium text-black">
            {minutes}:{seconds < 10 ? '0' : ''}
            {seconds}
          </p>
        )}
        {expired && (
          <p className="mt-4 text-sm font-medium text-gray-600">OTP Expired</p>
        )}
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

        <SubmitBtn text="Verify" isLoading={isSubmitting || isResending} />

        <p className="text-center text-sm text-slate-400">
          Didn’t get the code?
          <button
            type="button"
            className="text-black hover:text-gray-600 font-medium ml-1 underline cursor-pointer
            disabled:cursor-not-allowed disabled:opacity-30"
            disabled={!expired}
            onClick={resendOTP}
          >
            Resend
          </button>
        </p>
        <p className="text-center text-xs text-slate-400 mt-2">
          We’ve sent a 6-digit verification code to{' '}
          <span className="font-medium">{email}</span>. Please check your inbox
          and spam folder.
        </p>
      </form>
    </>
  );
};
