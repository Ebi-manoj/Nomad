import { createClient } from 'redis';
import { env } from '../utils/env';

const redisClient = createClient({
  url: env.REDIS_URI,
});

export async function connectRedis() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('Redis connection established');
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export { redisClient };
