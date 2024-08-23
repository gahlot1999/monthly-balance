import express from 'express';
import cors from 'cors';
import requestTime from './middleware/RequestTime.js';
import welcome from './helpers/welcome.js';
import { router as monthlyBalanceRouter } from './routes/monthlyBalanceRoutes.js';
import globalErrorHandler from './helpers/globalErrorHandler.js';
import notFound from './helpers/notFound.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestTime);

app.get('/api/v1', welcome);
app.use('/api/v1/monthlyBalance', monthlyBalanceRouter);

app.all('*', notFound);

app.use(globalErrorHandler);

export default app;
