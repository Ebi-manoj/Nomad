import express from 'express';
import { connectMongo } from '../../../infra/database/connectMongo';
import authRouter from '../routes/auth.routes';
import userRouter from '../routes/user/user.routes';
import paymentRouter from '../routes/payment.routes';
import hikeRouter from '../routes/user/hike.routes';
import rideRouter from '../routes/user/ride.routes';
import userManagementRouter from '../routes/admin/user.routes';
import documentRouter from '../routes/admin/documents.routes';
import fileRouter from '../routes/file.routes';
import { errorHandling } from '../middlewares/errorHandlingMiddleware';
import { connectRedis } from '../../../infra/database/connectRedis';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { createServer } from 'http';
import { SocketServer } from '../../sockets/socketInit';

connectMongo();
connectRedis();
const app = express();
const server = createServer(app);
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

SocketServer.init(server, ['http://localhost:5173']);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/hike', hikeRouter);
app.use('/api/v1/ride', rideRouter);

app.use('/api/v1/file', fileRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/admin/users', userManagementRouter);
app.use('/api/v1/admin/documents', documentRouter);

app.use(errorHandling);

server.listen(3000, () => console.log('Server running on Port 3000'));
