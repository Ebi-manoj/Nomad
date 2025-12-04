import { useState } from 'react';
import { Check, X, Zap, Crown } from 'lucide-react';
import { plans } from '@/utils/Plan';
import {
  type BillingCycle,
  type CreateSubscriptionCheckoutSessionDTO,
  type SubscriptionTierType,
} from '@/types/subscription';
import { getSubscriptionCheckout } from '@/api/subscription';
import { useHandleApiError } from '@/hooks/useHandleApiError';

export const SubscriptionPricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('MONTHLY');

  const handleSubscription = async (code: SubscriptionTierType) => {
    const dto: CreateSubscriptionCheckoutSessionDTO = {
      tier: code,
      billingCycle,
    };
    try {
      const data = await getSubscriptionCheckout(dto);
      window.location.assign(data.url);
    } catch (error) {
      useHandleApiError(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Ride Smarter, Travel Further</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6">
            Choose Your Nomad Plan
          </h1>
          <p className="text-lg text-slate-400">
            Whether you're hitching a ride or offering a seat, we have a plan
            that fits your journey.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <span
              className={`text-sm font-medium ${
                billingCycle === 'MONTHLY' ? 'text-white' : 'text-slate-500'
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === 'MONTHLY' ? 'YEARLY' : 'MONTHLY'
                )
              }
              className="cursor-pointer relative w-14 h-8 bg-slate-800 rounded-full p-1 border border-slate-700 transition-colors focus:outline-none ring-offset-2 ring-offset-slate-900 focus:ring-2 focus:ring-emerald-500"
            >
              <div
                className={`w-6 h-6 bg-emerald-500 rounded-full shadow-md transform transition-transform duration-300 ${
                  billingCycle === 'YEARLY' ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
            <span
              className={`text-sm font-medium ${
                billingCycle === 'YEARLY' ? 'text-white' : 'text-slate-500'
              }`}
            >
              Yearly{' '}
              <span className="text-emerald-400 text-xs ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 
                ${
                  plan.popular
                    ? 'bg-slate-800/80 border-amber-500/50 shadow-lg shadow-amber-900/20'
                    : 'bg-slate-800/40 border-slate-700 hover:border-slate-600 hover:bg-slate-800/60'
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3" /> BEST VALUE
                </div>
              )}

              {/* Card Header */}
              <div className="mb-6">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-slate-900 border border-slate-700`}
                >
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.title}
                </h3>
                <p className="text-sm text-slate-400 h-10">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">
                    ₹
                    {billingCycle === 'MONTHLY'
                      ? plan.price.monthly
                      : plan.price.yearly}
                  </span>
                  <span className="text-slate-500">
                    /{billingCycle === 'MONTHLY' ? 'mo' : 'yr'}
                  </span>
                </div>
                {billingCycle === 'YEARLY' && plan.price.monthly > 0 && (
                  <div className="text-xs text-emerald-400 mt-1">
                    Save ₹{plan.price.monthly * 12 - plan.price.yearly} / year
                  </div>
                )}
                <div className="mt-4 inline-block px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
                  Fee: {plan.platformFee}
                </div>
              </div>

              {/* Features */}
              <div className="flex-grow mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check
                          className={`w-5 h-5 flex-shrink-0 ${
                            plan.color === 'amber'
                              ? 'text-amber-400'
                              : plan.color === 'emerald'
                              ? 'text-emerald-400'
                              : plan.color === 'blue'
                              ? 'text-blue-400'
                              : 'text-slate-500'
                          }`}
                        />
                      ) : (
                        <X className="w-5 h-5 text-slate-600 flex-shrink-0" />
                      )}
                      <div className="flex flex-col">
                        <span
                          className={`text-sm ${
                            feature.included
                              ? 'text-slate-200'
                              : 'text-slate-500 line-through'
                          }`}
                        >
                          {feature.text}
                        </span>
                        {feature.subtext && (
                          <span className="text-xs text-slate-500 mt-0.5">
                            {feature.subtext}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer
                ${
                  plan.popular
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:to-orange-500 text-white shadow-lg shadow-orange-900/20'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }
              `}
                onClick={() => handleSubscription(plan.code)}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ / Trust Section */}
        <div className="mt-20 border-t border-slate-800 pt-10 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Trusted by over 10,000 nomads across the country
          </p>
          <div className="flex justify-center gap-6 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0">
            {/* Mock Logos */}
            <div className="h-8 w-24 bg-slate-700/50 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-slate-700/50 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-slate-700/50 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
