import { AuthInput } from '@/components/Auth/Input';
import { SubmitBtn } from '@/components/Auth/SubmitBtn';
import { useSendOTP } from '@/hooks/useSendOTP';
import { emailSchema, type emailFormData } from '@/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<emailFormData>({ resolver: zodResolver(emailSchema) });

  async function onSubmit(data: emailFormData) {
    const result = await useSendOTP(data);
    if (!result.success) return;
    navigate('/auth/verify-otp');
  }

  return (
    <>
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 leading-tight text-pretty">
          Reset your password
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Enter your email address and we’ll send you a link to reset your
          password.
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

        <SubmitBtn text="Send reset link" isLoading={isSubmitting} />

        <p className="text-center text-sm text-slate-400">
          Remember your password?
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
