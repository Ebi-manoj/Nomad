import { Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import { Signup } from './pages/Auth/Signup';
import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/Auth/Login';
import { SignupDetails } from './pages/Auth/SignupDetails';
import { VerifyOTP } from './pages/Auth/VerifyOTP';
import { ResetPassword } from './pages/Auth/ResetPassword';
import { ChangePassword } from './pages/Auth/ChangePassword';
import { Home } from './pages/User/Home';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="sign-in" replace />} />
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="details" element={<SignupDetails />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
