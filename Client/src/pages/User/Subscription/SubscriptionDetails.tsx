import {
  Calendar,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Lock,
} from 'lucide-react';
import type { GetSubscriptionDetailsResDTO } from '@/types/subscription';
import { FaMoneyCheckAlt } from 'react-icons/fa';

export const SubscriptionDetailsPage = ({
  data,
  handleManage,
}: {
  data: GetSubscriptionDetailsResDTO;
  handleManage: () => void;
}) => {
  const { subscription, subscriptionUsage, features, tier } = data;
  const calculateProgress = (used: number, limit: number | null) => {
    if (limit === null) return 0;
    return Math.min((used / limit) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-500/30">
      {/* Background Decor (Same as Pricing Page) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Subscription Management
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Manage your plan, check usage limits, and view billing details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Main Status Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Plan Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-slate-900">
                        {tier}
                      </h2>
                      <span
                        style={{
                          background: !subscription?.badgeColor
                            ? 'gray'
                            : subscription.badgeColor,
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-bold text-white tracking-wide`}
                      >
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm">
                      Billing cycle:{' '}
                      <span className="font-medium capitalize">
                        {subscription?.billingCycle.toLowerCase()}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-slate-900">
                      ₹{subscription?.price || 0}
                    </p>
                    <p className="text-slate-500 text-xs">
                      /{' '}
                      {subscription?.billingCycle === 'MONTHLY'
                        ? 'month'
                        : 'year'}
                    </p>
                  </div>
                </div>

                {/* Usage Stats Section */}
                <div className="space-y-6 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Current Month Usage
                  </h3>

                  {/* Stat 1: Ride Acceptances */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Ride Acceptances</span>
                      <span className="font-medium text-slate-900">
                        {subscriptionUsage.rideAcceptancesCount} /{' '}
                        {features.maxRideAcceptancesPerMonth ?? 'Unlimited'}
                      </span>
                    </div>
                    {features.maxRideAcceptancesPerMonth ? (
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${calculateProgress(
                              subscriptionUsage.rideAcceptancesCount,
                              features.maxRideAcceptancesPerMonth
                            )}%`,
                          }}
                        ></div>
                      </div>
                    ) : (
                      <div className="h-2.5 w-full bg-emerald-100 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-emerald-500/20 animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  {/* Stat 2: Join Requests */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Join Requests Sent</span>
                      <span className="font-medium text-slate-900">
                        {subscriptionUsage.joinRequestsCount} /{' '}
                        {features.maxJoinRequestsPerRide
                          ? `${features.maxJoinRequestsPerRide} per ride`
                          : 'Unlimited'}
                      </span>
                    </div>
                    {features.maxJoinRequestsPerRide !== null && (
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        {/* Logic for per-ride limits is tricky to show as a single bar, so we usually just show a generic bar or info */}
                        <div className="h-full bg-blue-500 w-full opacity-20"></div>
                      </div>
                    )}
                    {features.maxJoinRequestsPerRide === null && (
                      <div className="h-2.5 w-full bg-blue-100 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500/20 animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="bg-slate-50 px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Next billing:{' '}
                    {subscription?.endDate
                      ? new Date(subscription.endDate).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" /> Plan Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureItem
                  label="Platform Fee"
                  value={`${features.platformFeePercentage}%`}
                  icon={<CreditCard className="w-4 h-4 text-slate-900" />}
                />
                <FeatureItem
                  label="Verification Badge"
                  value={
                    features.verificationBadge ? 'Included' : 'Not Included'
                  }
                  highlight={features.verificationBadge}
                  icon={<ShieldCheck className="w-4 h-4 text-blue-500" />}
                />
                <FeatureItem
                  label="Priority Listing"
                  value={features.priorityInList ? 'Active' : 'Standard'}
                  highlight={features.priorityInList}
                  icon={<TrendingUp className="w-4 h-4 text-green-600" />}
                />
                <FeatureItem
                  label="Custom Cost Sharing"
                  value={
                    features.customCostSharing ? (
                      'Unlocked'
                    ) : (
                      <Lock size={15} className="text-amber-500" />
                    )
                  }
                  highlight={features.customCostSharing}
                  icon={<FaMoneyCheckAlt className="w-4 h-4 text-red-400" />}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Info / Upsell */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="font-bold text-lg mb-2 relative z-10">
                Need more flexibility?
              </h3>
              <p className="text-slate-300 text-sm mb-6 relative z-10">
                Upgrade to our Premium Plus plan to unlock custom cost sharing
                and reduce platform fees.
              </p>
              <button
                className="w-full py-2.5 cursor-pointer bg-white text-slate-900 font-semibold rounded-lg text-sm hover:bg-slate-100 transition-colors relative z-10"
                onClick={handleManage}
              >
                View Upgrade Options
              </button>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800 text-sm">
                    Important Note
                  </h4>
                  <p className="text-amber-700/80 text-xs mt-1">
                    Cancellations take effect at the end of your current billing
                    period. You will retain access to features until then.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureItemProps {
  label: string;
  value: string | React.ReactNode;
  icon: React.ReactNode;
  highlight?: boolean;
}

// Small Sub-component for Feature Grid
const FeatureItem = ({
  label,
  value,
  icon,
  highlight = false,
}: FeatureItemProps) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm text-slate-600">{label}</span>
    </div>
    <span
      className={`text-sm font-medium ${
        highlight ? 'text-emerald-600' : 'text-slate-900'
      }`}
    >
      {value}
    </span>
  </div>
);
