import { AuthInput } from '../../components/Input';
import { SubmitBtn } from '../../components/SubmitBtn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupDetailsSchema } from '../../validation/auth';
import type { signupDetailsFormData } from '../../validation/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'sonner';
import { handleApiError } from '@/utils/HandleApiError';
import { useEffect } from 'react';

type RequestDTO = signupDetailsFormData & {
  email: string;
  verificationToken: string;
};

export const SignupDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, token } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupDetailsSchema) });

  useEffect(() => {
    if (!email || !token) {
      navigate('/auth/sign-up');
      return;
    }
  }, [email, token]);

  async function onSubmit(data: signupDetailsFormData) {
    if (!email || !token) {
      navigate('/auth/sign-up');
      return;
    }
    const requestData: RequestDTO = {
      email,
      verificationToken: token,
      ...data,
    };
    try {
      await axiosInstance.post('/auth/signup', requestData);
      toast.success('Signed In successfully...', {
        description: 'Please Login to Continue',
      });
      navigate('/auth/sign-in');
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <>
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 leading-tight text-pretty">
          Fill in your details
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          You’re almost there! Fill in your details to finish setting up your
          account.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        className="mt-6 grid gap-4"
      >
        <AuthInput
          type="text"
          label="Full name"
          name="fullName"
          error={errors.fullName}
          register={register}
        />
        <AuthInput
          type="tel"
          label="Mobile"
          name="mobile"
          error={errors.mobile}
          register={register}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuthInput
            type="password"
            label="Password"
            name="password"
            error={errors.password}
            register={register}
          />
          <AuthInput
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            error={errors.confirmPassword}
            register={register}
          />
        </div>

        <SubmitBtn text="Submit" isLoading={isSubmitting} />
        <p className="mt-2 text-xs text-slate-400 text-center">
          By signing up, you agree to our{' '}
          <a className="text-blue-500 hover:underline">Terms of Service </a>
          and <a className="text-blue-500 hover:underline">Privacy Policy</a>.
        </p>
      </form>
    </>
  );
};
