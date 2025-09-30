import { Route, Routes } from 'react-router-dom';
import './index.css';
import { Signup } from './pages/Auth/Signup';
import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/Auth/Login';
import { SignupDetails } from './pages/Auth/SignupDetails';
import { VerifyOTP } from './pages/Auth/VerifyOTP';
import { ResetPassword } from './pages/Auth/ResetPassword';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="details" element={<SignupDetails />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
