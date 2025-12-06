import type { SubscriptionDTO } from '@/types/subscription';
import { plans } from '@/utils/Plan';
import {
  ArrowRight,
  Calendar,
  Check,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface DetailProps {
  subscription: SubscriptionDTO;
}

export const ShowDetails = ({ subscription }: DetailProps) => {
  const getPlanDetails = () => {
    if (!subscription) return null;
    return plans.find(plan => plan.code === subscription.tier) || plans[0]; // Fallback for demo
  };

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/hike', { replace: true });
  };

  const planDetails = getPlanDetails();

  // Format Date Helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!subscription) return null;

  return (
    <div className="min-h-screen bg-white  selection:bg-emerald-500/30 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      {/* Background Decor Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Success Icon & Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 ring-8 ring-green-50">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Subscription Active
          </h1>
          <p className="text-gray-500">
            Welcome to the{' '}
            <span className="font-semibold text-gray-900">
              {subscription.tier}
            </span>{' '}
            family!
          </p>
        </div>

        {/* Unified Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {/* Top Section: Plan Summary */}
          <div className="p-8 pb-6">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Current Plan
                </p>
                <h2 className="text-3xl font-bold text-gray-900">
                  {subscription.tier}
                </h2>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Active Status
                </div>
              </div>
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-700">
                {planDetails?.icon}
              </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase">Cycle</span>
                </div>
                <p className="font-semibold text-gray-900 capitalize">
                  {subscription.billingCycle}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase">Renews</span>
                </div>
                <p className="font-semibold text-gray-900">
                  {formatDate(subscription.endDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Middle Divider */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2"></div>
          </div>

          {/* Bottom Section: Features */}
          <div className="p-8 pt-6">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Unlocked Features
              </h3>
            </div>

            <ul className="space-y-4">
              {planDetails?.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-gray-600 group"
                >
                  <div className="mt-0.5 min-w-[1.25rem]">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="group-hover:text-gray-900 transition-colors">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6">
              <button
                className="w-full group bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 
              px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20 
              hover:shadow-gray-900/30 active:scale-[0.98] cursor-pointer"
                onClick={handleRedirect}
              >
                Go to Home
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center flex justify-center gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-gray-900 transition-colors">
            Need Help?
          </a>
          <span>•</span>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Manage Subscription
          </a>
        </div>
      </div>
    </div>
  );
};
