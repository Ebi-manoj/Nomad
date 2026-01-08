import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthBtn } from '../../components/GoogleAuthBtn';
import { AuthInput } from '../../components/Input';
import { SubmitBtn } from '../../components/SubmitBtn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema } from '../../validation/auth';
import type { emailFormData } from '../../validation/auth';
import { SendOTP } from '@/utils/sendOTP';

export const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<emailFormData>({ resolver: zodResolver(emailSchema) });

  async function onSubmit(data: emailFormData) {
    const result = await SendOTP(data, 'signup');
    if (!result.success) return;
    navigate('/auth/verify-otp');
  }

  return (
    <>
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 leading-tight text-pretty">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Join Nomad to move faster, safer, and smarter.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        className="mt-6 grid gap-4"
      >
        <AuthInput
          type="text"
          label="Email"
          name="email"
          error={errors.email}
          register={register}
        />

        <SubmitBtn text="Continue" isLoading={isSubmitting} />

        <div className="flex items-center mb-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <GoogleAuthBtn />

        <p className="text-center text-sm text-slate-400">
          Already have an account?
          <Link to={'/auth/sign-in'}>
            <span className="text-black hover:text-gray-600 font-medium ml-1 underline cursor-pointer">
              Log in
            </span>
          </Link>
        </p>
      </form>
    </>
  );
};
