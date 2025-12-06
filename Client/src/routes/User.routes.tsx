import { Route } from 'react-router-dom';
import { Protected } from './Protected';
import { HomeLayout } from '@/layouts/HomeLayout';
import { Hike } from '@/pages/User/Hike';
import ProfilePage from '@/pages/User/Profile';
import { RideMatching } from '@/pages/User/MatchRideToHike';
import { Ride } from '@/pages/User/Ride';
import { ActivityPage } from '@/pages/User/Activity/Activity';
import { RideStarted } from '@/pages/User/RideStarted';
import { ProtectedSession } from './ProtectedSessions';
import { Payment } from '@/pages/User/HikerPayment/Payment';
import { PaymentSuccessPage } from '@/pages/User/HikePaymentSuccess/Index';
import { HikeStartedPage } from '@/pages/User/HikeConfirmed/Index';
import { HikeCompletedPage } from '@/pages/User/HikeCompleted/index';
import { SosManagementPage } from '@/pages/User/SOS/SosManagement';
import { WalletPage } from '@/pages/User/Wallet/Index';
import { RideCompletedPage } from '@/pages/User/RideCompleted/Index';
import { SubscriptionPricingPage } from '@/pages/User/Subscription/Subscription';
import { SubscriptionSuccessPage } from '@/pages/User/Subscription/Successpage/Success';

export const UserRoutes = (
  <Route
    path="/"
    element={
      <Protected allowedRole="user">
        <HomeLayout />
      </Protected>
    }
  >
    <Route
      path="hike"
      element={
        <ProtectedSession>
          <Hike />
        </ProtectedSession>
      }
    />
    <Route
      path="hike/match"
      element={
        <ProtectedSession requireActiveHike>
          <RideMatching />
        </ProtectedSession>
      }
    />
    <Route
      path="hike/started/:bookingId"
      element={
        <ProtectedSession requireActiveHike>
          <HikeStartedPage />
        </ProtectedSession>
      }
    />
    <Route path="hike/:hikeId" element={<HikeCompletedPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route
      path="/ride"
      element={
        <ProtectedSession>
          <Ride />
        </ProtectedSession>
      }
    />
    <Route
      path="/ride/started"
      element={
        <ProtectedSession requireActiveRide>
          <RideStarted />
        </ProtectedSession>
      }
    />
    <Route path="/ride/:rideId" element={<RideCompletedPage />} />
    <Route path="/payment/:paymentId" element={<Payment />} />
    <Route path="/payment-success" element={<PaymentSuccessPage />} />
    <Route path="/activity" element={<ActivityPage />} />
    <Route path="/sos" element={<SosManagementPage />} />
    <Route path="/wallet" element={<WalletPage />} />
    <Route path="/subscriptions" element={<SubscriptionPricingPage />} />
    <Route path="/subscription/success" element={<SubscriptionSuccessPage />} />
  </Route>
);
