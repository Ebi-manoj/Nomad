import { AuthInput } from '@/components/Input';
import { SubmitBtn } from '@/components/SubmitBtn';
import { handleApiError } from '@/utils/HandleApiError';
import axiosInstance from '@/utils/axiosInstance';
import {
  changePasswordSchema,
  type changePasswordData,
} from '@/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type resetPasswordReqDTO = {
  password: string;
  verificationToken: string;
};

export const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<changePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { email, token } = location.state || {};

  async function onSubmit(data: changePasswordData) {
    console.log(data);
    const requestDTO: resetPasswordReqDTO = {
      password: data.password,
      verificationToken: token,
    };
    try {
      const res = await axiosInstance.post('/auth/reset-password', requestDTO);
      const successMessage =
        res.data.data.message || 'Password Reset SuccessFully';
      toast.success(successMessage, { description: 'Login to continue' });
      navigate('/auth/sign-in');
    } catch (error) {
      handleApiError(error);
    }
  }

  useEffect(() => {
    console.log(email, token);
    if (!email || !token) {
      navigate('/auth/reset-password');
      return;
    }
  }, [email, token]);

  return (
    <>
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 leading-tight text-pretty">
          Change your password
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Enter your new password to secure your Nomad account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
        <AuthInput
          type="password"
          label="New Password"
          name="password"
          register={register}
          error={errors.password}
        />

        <AuthInput
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
        />

        <SubmitBtn text="Change Password" isLoading={isSubmitting} />
      </form>
    </>
  );
};
