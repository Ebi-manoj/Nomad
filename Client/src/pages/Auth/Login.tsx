import { Link } from 'react-router-dom';
import { GoogleAuthBtn } from '../../components/Auth/GoogleAuthBtn';
import { AuthInput } from '../../components/Auth/Input';
import { SubmitBtn } from '../../components/Auth/SubmitBtn';
import { loginSchema, type loginFormData } from '../../validation/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  function onSubmit(data: loginFormData) {
    console.log(data);
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

        <div className="flex items-center mb-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <AuthInput<loginFormData>
          type="text"
          label="Email"
          name="email"
          register={register}
          error={errors.email}
        />
        <AuthInput<loginFormData>
          type="password"
          label="Password"
          name="password"
          error={errors.password}
          register={register}
        />

        <SubmitBtn text="Log in" />

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
