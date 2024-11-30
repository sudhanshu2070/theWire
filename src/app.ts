import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import errorHandler from './middlewares/errorHandler';
import './config/env';

  const app = express();

  // Middleware
  app.use(cors());
  app.use(json());

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy!' });
  });

  //Routes
  app.use('/api', authRoutes);
  app.use('/api', contactRoutes);

  //Fallback for unmatched routes
  app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });

  //Error handler
  app.use(errorHandler);

export default app;