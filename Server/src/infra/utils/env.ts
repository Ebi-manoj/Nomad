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
};
