import { Request, Response, NextFunction } from 'express';

// Error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack); // Logging the error stack trace
  res.status(500).send('Something broke in the middleware!'); // Sending a error message
};

export default errorHandler;