import { Request } from 'express';

// Extend the Request interface from Express
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}