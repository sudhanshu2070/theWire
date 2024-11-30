import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError'; 

// Error handling middleware
const errorHandler = 
(
  err: Error | CustomError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  
   // If the error is an instance of CustomError, using its properties
   if (err instanceof CustomError) {
    return res.status(err.status).json({
      success: err.success,
      message: err.message,
    });
  }

 // Otherwise, a case of generic error, logging it and sending a server error response
 console.error(err);
 return res.status(500).json({
   success: false,
   message: 'Internal Server Error, sent from above and beyond',
 });
};

export default errorHandler;