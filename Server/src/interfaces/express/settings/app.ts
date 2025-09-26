import express from 'express';
import { connectMongo } from '../../../infra/database/connectMongo';
import authRouter from '../routes/auth.routes';
import { errorHandling } from '../middlewares/errorHandlingMiddleware';

connectMongo();
const app = express();
app.use(express.json());

app.use('/auth', authRouter);

app.use(errorHandling);

app.listen(3000, () => console.log('Server running on Port 3000'));
