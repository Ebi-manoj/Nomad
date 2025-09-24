import { AuthLayout } from './components/Auth/AuthLayout';
import { GoogleAuthBtn } from './components/Auth/GoogleAuthBtn';
import { AuthInput } from './components/Auth/Input';
import { SubmitBtn } from './components/Auth/SubmitBtn';

export const Signup = () => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Nomad to move faster, safer, and smarter."
    >
      <form action="#" method="post" className="mt-6 grid gap-4">
        <GoogleAuthBtn />

        <div className="flex items-center mb-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <AuthInput type="text" label="Full name" />
        <AuthInput type="text" label="Email" />
        <AuthInput type="tel" label="Mobile" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuthInput type="password" label="Password" />
          <AuthInput type="password" label="Confirm password" />
        </div>

        <SubmitBtn text="Sign up" />

        <p className="text-center text-sm text-slate-400">
          Already have an account?
          <a
            href="#"
            className="text-black hover:text-gray-600 font-medium ml-1 underline"
          >
            Log in
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};
