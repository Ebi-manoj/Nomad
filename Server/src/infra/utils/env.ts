import dotenv from 'dotenv';

dotenv.config();

function getEnvVariables(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) throw new Error(`Missing Environment variables${key}`);
  return value;
}

export const env = {
  PORT: getEnvVariables('PORT', '3000'),
  MONGO_URI: getEnvVariables('MONGO_URI', 'mongodb://localhost:27017/Nomad'),
  JWT_SECERT: getEnvVariables('JWT_SECRET'),
  REDIS_URI: getEnvVariables('REDIS_URI', 'redis://localhost:6379'),
  GOOGLE_APP_PASSWORD: getEnvVariables('GOOGLE_APP_PASSWORD'),
  EMAIL_ADDRESS: getEnvVariables('EMAIL_ADDRESS'),
  GOOGLE_CLIENT_ID: getEnvVariables('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: getEnvVariables('GOOGLE_CLIENT_SECRET'),
  AWS_S3_ACCESS_KEY: getEnvVariables('AWS_S3_ACCESS_KEY'),
  AWS_S3_SECRET_KEY: getEnvVariables('AWS_S3_SECRET_KEY'),
  AWS_S3_REGION: getEnvVariables('AWS_S3_REGION'),
  AWS_BUCKET_NAME: getEnvVariables('AWS_BUCKET_NAME'),
  GOOGLE_MAPS_API_KEY: getEnvVariables('GOOGLE_MAPS_API_KEY'),
  STRIPE_SECRET_KEY: getEnvVariables('STRIPE_SECRET_KEY'),
  STRIPE_HIKER_PRO_MONTHLY: getEnvVariables('STRIPE_HIKER_PRO_MONTHLY'),
  STRIPE_HIKER_PRO_YEARLY: getEnvVariables('STRIPE_HIKER_PRO_YEARLY'),
  STRIPE_RIDER_PRO_MONTHLY: getEnvVariables('STRIPE_RIDER_PRO_MONTHLY'),
  STRIPE_RIDER_PRO_YEARLY: getEnvVariables('STRIPE_RIDER_PRO_YEARLY'),
  STRIPE_PREMIUM_PLUS_MONTHLY: getEnvVariables('STRIPE_PREMIUM_PLUS_MONTHLY'),
  STRIPE_PREMIUM_PLUS_YEARLY: getEnvVariables('STRIPE_PREMIUM_PLUS_YEARLY'),
  STRIPE_WEBHOOKSECERTKEY: getEnvVariables('STRIPE_WEBHOOKSECERTKEY'),
  CLIENT_URL: getEnvVariables('CLIENT_URL'),
  RAZORPAY_KEY_ID: getEnvVariables('RAZORPAY_KEY_ID'),
  RAZORPAY_SECRET: getEnvVariables('RAZORPAY_SECRET'),
  RAZORPAY_ACCOUNT_NUMBER: getEnvVariables('RAZORPAY_ACCOUNT_NUMBER'),
};
