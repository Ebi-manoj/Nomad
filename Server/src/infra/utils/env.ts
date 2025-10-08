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
};
