import { Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import { Signup } from './pages/Auth/Signup';
import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/Auth/Login';
import { SignupDetails } from './pages/Auth/SignupDetails';
import { VerifyOTP } from './pages/Auth/VerifyOTP';
import { ResetPassword } from './pages/Auth/ResetPassword';
import { ChangePassword } from './pages/Auth/ChangePassword';
import { Protected } from './routes/Protected';
import { IsAuthenticated } from './routes/IsAuthenticated';
import { HomeLayout } from './layouts/HomeLayout';
import { Hike } from './pages/User/Hike';
import { Landing } from './pages/Landing';

function App() {
  return (
    <Routes>
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
      <Route path="/" element={<Landing />} />
      <Route
        path="/"
        element={
          <Protected>
            <HomeLayout />
          </Protected>
        }
      >
        <Route path="hike" element={<Hike />} />
      </Route>
    </Routes>
  );
}

export default App;
