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
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminLayout } from './layouts/AdminLayout';
import { UserMangement } from './pages/Admin/UserManagement';

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
          <Protected allowedRole="user">
            <HomeLayout />
          </Protected>
        }
      >
        <Route path="hike" element={<Hike />} />
      </Route>

      <Route
        path="/admin"
        element={
          <Protected allowedRole="admin">
            <AdminLayout />
          </Protected>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserMangement />} />
      </Route>
    </Routes>
  );
}

export default App;
