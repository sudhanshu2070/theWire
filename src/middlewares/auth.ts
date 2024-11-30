import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import jwtSecret from '../config/jwt';
import CustomError from '../utils/customError'; 

// Define the structure of your JWT payload
interface CustomJwtPayload extends JwtPayload {
  user: {
    id: string;
  };
}

// Middleware function
const auth = (req: Request, res: Response, next: NextFunction) => {

  // Retrieving the token from the request - header
  const token = req.header('x-auth-token');
  
  if (!token) {
    //return res.status(401).json({ msg: 'No token, authorization denied' });
    throw new CustomError('Authorization denied. No token provided.', 401);
  }

  try {
    // Verifying the token
    const decoded = verify(token, jwtSecret) as CustomJwtPayload;

    // Attaching the decoded user information to the request object
    req.body.user = decoded.user;

    next(); // Continuing to the next middleware or route handler
  } catch (err) {
      throw new CustomError('Invalid or expired token.', 401);
  }
};

export default auth;