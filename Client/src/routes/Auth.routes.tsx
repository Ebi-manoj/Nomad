import { AuthLayout } from '@/layouts/AuthLayout';
import { Navigate, Route } from 'react-router-dom';
import { IsAuthenticated } from './IsAuthenticated';
import { Login } from '@/pages/Auth/Login';
import { Signup } from '@/pages/Auth/Signup';
import { VerifyOTP } from '@/pages/Auth/VerifyOTP';
import { SignupDetails } from '@/pages/Auth/SignupDetails';
import { ResetPassword } from '@/pages/Auth/ResetPassword';
import { ChangePassword } from '@/pages/Auth/ChangePassword';

export const AuthRoutes = (
  <Route path="/auth" element={<AuthLayout />}>
    <Route index element={<Navigate to="sign-in" replace />} />
    <Route
      path="sign-in"
      element={
        <IsAuthenticated>
          <Login />
        </IsAuthenticated>
      }
    />
    <Route
      path="sign-up"
      element={
        <IsAuthenticated>
          <Signup />
        </IsAuthenticated>
      }
    />
    <Route path="verify-otp" element={<VerifyOTP />} />
    <Route path="details" element={<SignupDetails />} />
    <Route path="reset-password" element={<ResetPassword />} />
    <Route path="change-password" element={<ChangePassword />} />
  </Route>
);
