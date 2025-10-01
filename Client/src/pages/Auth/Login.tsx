import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthBtn } from '../../components/Auth/GoogleAuthBtn';
import { AuthInput } from '../../components/Auth/Input';
import { SubmitBtn } from '../../components/Auth/SubmitBtn';
import { loginSchema, type loginFormData } from '../../validation/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/store/features/auth/authSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toast } from 'sonner';

export const Login = () => {
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
      await dispatch(login(data)).unwrap();
      navigate('/home');
    } catch (error: unknown) {
      toast.success(typeof error == 'string' ? error : 'Something went wrong');
    }
  }

  return (
    <>
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 leading-tight text-pretty">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Log in to continue your journey with Nomad.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
        <GoogleAuthBtn />

        <div className="flex items-center mb-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
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

        <Link to="/auth/reset-password">
          <p className="text-right text-xs text-slate-400 cursor-pointer hover:text-black transition duration-200">
            Forgot Password?
          </p>
        </Link>
        <SubmitBtn text="Log in" isLoading={isSubmitting} />

        <p className="text-center text-sm text-slate-400">
          Don’t have an account?
          <Link to="/auth/sign-up">
            <span className="text-black hover:text-gray-600 font-medium ml-1 underline">
              Sign up
            </span>
          </Link>
        </p>
      </form>
    </>
  );
};
