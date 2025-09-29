import express from 'express';
import { connectMongo } from '../../../infra/database/connectMongo';
import authRouter from '../routes/auth.routes';
import { errorHandling } from '../middlewares/errorHandlingMiddleware';
import { connectRedis } from '../../../infra/database/connectRedis';
import cors from 'cors';

connectMongo();
connectRedis();
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);
app.use('/api/v1/auth', authRouter);

app.use(errorHandling);

app.listen(3000, () => console.log('Server running on Port 3000'));
