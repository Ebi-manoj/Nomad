import express from 'express';
import { connectMongo } from '../../../infra/database/connectMongo';
import authRouter from '../routes/auth.routes';
import userRouter from '../routes/user/user.routes';
import userInsightRouter from '../routes/user/insight.routes';
import paymentRouter from '../routes/payment.routes';
import hikeRouter from '../routes/user/hike.routes';
import rideRouter from '../routes/user/ride.routes';
import chatRouter from '../routes/user/chat.routes';
import taskRouter from '../routes/user/task.routes';
import reviewRouter from '../routes/user/review.routes';
import userManagementRouter from '../routes/admin/user.routes';
import documentRouter from '../routes/admin/documents.routes';
import adminSosRouter from '../routes/admin/sos.routes';
import adminHikeRouter from '../routes/admin/hike.routes';
import adminRideRouter from '../routes/admin/ride.routes';
import adminDashboardRouter from '../routes/admin/dashboard.routes';
import adminSubscriptionPlanRouter from '../routes/admin/subscriptionPlan.routes';
import adminRevenueRouter from '../routes/admin/revenue.routes';
import fileRouter from '../routes/file.routes';
import subscriptionRouter from '../routes/subscription.routes';
import webhookRouter from '../routes/webhook.routes';
import { errorHandling } from '../middlewares/errorHandlingMiddleware';
import { connectRedis } from '../../../infra/database/connectRedis';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { createServer } from 'http';
import { SocketServer } from '../../sockets/socketInit';
import { startSchedules } from '../../../infra/services/composer/scheduler.composer';
import { env } from '../../../infra/utils/env';

connectMongo();
connectRedis();
const app = express();
const server = createServer(app);
app.use(cookieparser());

app.use('/api/v1/webhook', webhookRouter);
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

SocketServer.init(server, ['http://localhost:5173']);
startSchedules().start();
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'nomad-backend',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/user/insights', userInsightRouter);
app.use('/api/v1/hike', hikeRouter);
app.use('/api/v1/ride', rideRouter);
app.use('/api/v1/task', taskRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/review', reviewRouter);

app.use('/api/v1/file', fileRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/admin/users', userManagementRouter);
app.use('/api/v1/admin/documents', documentRouter);
app.use('/api/v1/admin/sos', adminSosRouter);
app.use('/api/v1/admin/hike', adminHikeRouter);
app.use('/api/v1/admin/ride', adminRideRouter);
app.use('/api/v1/admin/subscription-plans', adminSubscriptionPlanRouter);
app.use('/api/v1/admin/dashboard', adminDashboardRouter);
app.use('/api/v1/admin/revenue', adminRevenueRouter);

app.use(errorHandling);
console.log('Listener count:', process.listenerCount('uncaughtException'));

server.listen(Number(env.PORT), '0.0.0.0', () =>
  console.log(`Server running on Port ${env.PORT}`)
);
