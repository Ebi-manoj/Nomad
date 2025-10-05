import { useNavigate } from 'react-router-dom';

import { AuthInput } from '../../components/Input';
import { SubmitBtn } from '../../components/SubmitBtn';
import { loginSchema, type loginFormData } from '../../validation/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toast } from 'sonner';
import { adminLogin } from '@/store/features/adminAuth/adminAuthSlice';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<loginFormData>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: loginFormData) {
    console.log(data);
    try {
      await dispatch(adminLogin(data)).unwrap();
      navigate('/admin');
    } catch (error: unknown) {
      toast.success(typeof error == 'string' ? error : 'Something went wrong');
    }
  }

  return (
    <>
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 leading-tight text-pretty">
          Admin Portal
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Sign in to manage and oversee your organization’s operations.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
        <AuthInput
          type="text"
          label="Email"
          name="email"
          register={register}
          error={errors.email}
        />
        <AuthInput
          type="password"
          label="Password"
          name="password"
          error={errors.password}
          register={register}
        />
        <SubmitBtn text="Log in" isLoading={isSubmitting} />
      </form>
    </>
  );
};
