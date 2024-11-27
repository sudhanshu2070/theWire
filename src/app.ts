import express, { json } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import errorHandler from './middlewares/errorHandler';
import './config/env';

const app = express();

app.use(cors());
app.use(json());

// const contactsDbURI = process.env.CONTACTS_DB_URI as string;
// const authDbURI = process.env.AUTH_CONTACT_URI as string;

// // Connecting to the databases
// connectDb(contactsDbURI);
// connectDb(authDbURI);

// Defining the routes
app.use('/api', authRoutes);
app.use('/api', contactRoutes);

// Error handler middleware
app.use(errorHandler);

export default app;