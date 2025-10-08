import mongoose from 'mongoose';
import { env } from '../utils/env';

export const connectMongo = async function () {
  try {
    const connection = await mongoose.connect(env.MONGO_URI);
    console.log(
      `Database connected with ${connection.connection.host} ${connection.connection.name}`
    );
  } catch (error) {
    console.log('Error in mongoDb connection');
    process.exit(1);
  }
};
