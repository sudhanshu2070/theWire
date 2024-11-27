import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import jwtSecret from '../config/jwt';

// Define the structure of your JWT payload
interface CustomJwtPayload extends JwtPayload {
  user: {
    id: string;
  };
}

// Middleware function
const auth = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the header
  console.log("headers", req.headers);
  const token = req.header('x-auth-token');
  console.log("token:", token);
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = verify(token, jwtSecret) as CustomJwtPayload;
    // Attach the user to the request
    req.body.user = decoded.user;
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;