import express from 'express';
import { serviceRoutes } from './routes/serviceRoutes';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

app.use(express.json());
app.use('/api', serviceRoutes);
app.use(errorHandler);
