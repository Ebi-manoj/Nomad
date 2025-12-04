import { Crown, User } from 'lucide-react';
import { RiMotorbikeFill } from 'react-icons/ri';
import { FaHiking } from 'react-icons/fa';
import { SubscriptionTier, type SubscriptionTierType } from '@/types/subscription';
import type { ReactNode } from 'react';

type Feature = {
  text: string;
  included: boolean;
  subtext?: string;
};

type Plan = {
  title: string;
  code: SubscriptionTierType;
  icon: ReactNode;
  description: string;
  price: { monthly: number; yearly: number };
  platformFee: string;
  features: Feature[];
  cta: string;
  popular: boolean;
  color: 'gray' | 'emerald' | 'blue' | 'amber';
};

export const plans: Plan[] = [
  {
    title: 'Free Tier',
    code: SubscriptionTier.FREE,
    icon: <User className="w-6 h-6 text-gray-400" />,
    description: 'For casual nomads just starting out.',
    price: { monthly: 0, yearly: 0 },
    platformFee: '10%',
    features: [
      { text: '3 join requests per ride', included: true },
      { text: '20 ride acceptances/mo', included: true },
      { text: 'Basic app access', included: true },
      { text: 'Fixed cost sharing (₹5/km)', included: true },
      { text: 'Verification Badge', included: false },
      { text: 'Priority Listing', included: false },
      { text: 'Premium Support', included: false },
    ],
    cta: 'Start Free',
    popular: false,
    color: 'gray',
  },
  {
    title: 'Hiker PRO',
    code: SubscriptionTier.HIKER_PRO,
    icon: <FaHiking className="w-6 h-6 text-emerald-400" />,
    description: 'Perfect for frequent travelers looking for rides.',
    price: { monthly: 199, yearly: 1910 },
    platformFee: '5%',
    features: [
      { text: 'Unlimited join requests', included: true },
      { text: 'Verification Badge', included: true },
      { text: 'Priority Listing', included: true },
      { text: 'Reduced 5% Platform Fee', included: true },
      {
        text: 'Ride acceptances',
        included: false,
        subtext: 'Standard limits apply',
      },
      { text: 'Custom cost sharing', included: false },
      { text: 'Premium Support', included: false },
    ],
    cta: 'Be Hiker Pro',
    popular: false,
    color: 'emerald',
  },
  {
    title: 'Rider PRO',
    code: SubscriptionTier.RIDER_PRO,
    icon: <RiMotorbikeFill className="w-6 h-6 text-blue-400" />,
    description: 'For bike owners who love company.',
    price: { monthly: 299, yearly: 2870 },
    platformFee: '5%',
    features: [
      { text: 'Unlimited ride acceptances', included: true },
      { text: 'Custom cost sharing', included: true },
      { text: 'Verification Badge', included: true },
      { text: 'Priority Listing', included: true },
      { text: 'Reduced 5% Platform Fee', included: true },
      { text: 'Unlimited join requests', included: false },
      { text: 'Premium Support', included: false },
    ],
    cta: 'Be Rider Pro',
    popular: false,
    color: 'blue',
  },
  {
    title: 'Premium Plus',
    code: SubscriptionTier.PREMIUM_PLUS,
    icon: <Crown className="w-6 h-6 text-amber-400" />,
    description: 'The ultimate kit for full-time nomads.',
    price: { monthly: 449, yearly: 4310 },
    platformFee: '3%',
    features: [
      { text: 'All Hiker PRO features', included: true },
      { text: 'All Rider PRO features', included: true },
      { text: 'Lowest 3% Platform Fee', included: true },
      { text: 'Premium Support', included: true },
      { text: 'Unlimited Requests & Rides', included: true },
      { text: 'Custom cost sharing', included: true },
    ],
    cta: 'Go Premium',
    popular: true,
    color: 'amber',
  },
];
