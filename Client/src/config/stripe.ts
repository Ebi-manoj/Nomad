import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
export const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#16a34a',
    colorBackground: '#ffffff',
    colorText: '#1f2937',
    colorDanger: '#ef4444',
    borderRadius: '8px',
  },
};

export type stripeOptionType = StripeElementsOptions;
