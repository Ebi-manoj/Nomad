import { Link } from 'react-router-dom';
import { GoogleAuthBtn } from '../../components/Auth/GoogleAuthBtn';
import { AuthInput } from '../../components/Auth/Input';
import { SubmitBtn } from '../../components/Auth/SubmitBtn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../validation/auth';
import type { signUpFormData } from '../../validation/auth';

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  function onSubmit(data: signUpFormData) {
    console.log(data);
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
        <GoogleAuthBtn />

        <div className="flex items-center mb-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <AuthInput<signUpFormData>
          type="text"
          label="Full name"
          name="name"
          error={errors.name}
          register={register}
        />
        <AuthInput<signUpFormData>
          type="text"
          label="Email"
          name="email"
          error={errors.email}
          register={register}
        />
        <AuthInput<signUpFormData>
          type="tel"
          label="Mobile"
          name="mobile"
          error={errors.mobile}
          register={register}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuthInput<signUpFormData>
            type="password"
            label="Password"
            name="password"
            error={errors.password}
            register={register}
          />
          <AuthInput<signUpFormData>
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            error={errors.confirmPassword}
            register={register}
          />
        </div>

        <SubmitBtn text="Sign up" />

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
