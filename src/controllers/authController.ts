import dotenv from 'dotenv';;// #SOS (keep this at top)
import { Request, Response } from 'express';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import createAuthContactModel from '../models/AuthContact';
import jwtSecret from '../config/jwt';
import connectDb from '../config/db';
import CustomError from '../utils/customError';  // Create a custom error handling utility

dotenv.config();

// Create connection instance
const authDbURI = process.env.AUTH_DB_URI as string;
const authContactDbConnection = connectDb(authDbURI);

// Create AuthContact model
const AuthContact = async () => {
  const conn = await authContactDbConnection;
  return createAuthContactModel(conn);
};

// Error handling helper {Custom made}
const handleError = (error: Error, res: Response) => {
  const err = error as CustomError;
  console.error('Error:', err.message);
  if (err.status) {
    return res.status(err.status).json({ msg: err.message });
  }
  return res.status(500).send('Server error, sent from above and beyond');
};

// Signup controller
export const signup = async (req: Request, res: Response): Promise<Response> => {
  
  const { username, email, password, name, number } = req.body;

  try {

    // Check if user already exists
    const AuthContactModel = await AuthContact();
    let user = await AuthContactModel.findOne({ email });

    if (user) {
      throw new CustomError('User already exists', 400);
    }
    
    // Hashing the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Creating new user instance
    user = new AuthContactModel({
      username,
      email,
      password: hashedPassword,
      name,
      number,
    });

    // Saving the user to the database
    await user.save();
    return res.status(201).json({ msg: 'User registered successfully' });

  } 
  catch (error) {
    const err = error as Error; // Explicitly casting the error to Error
    return handleError(err, res);
  }
};


// Login controller
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  try {

    // Check if the user exists or not
    const AuthContactModel = await AuthContact();
    const user = await AuthContactModel.findOne({ username });
    
    if (!user) {
      throw new CustomError("User doesn't exist", 400); // Custom error
    }

    // Comparing the password
    const isMatch = await compare(password, user.password);
    
    if (!isMatch) {
      throw new CustomError('Invalid credentials', 400); // Custom error
    }

    // Creating JWT payload and sign the token
    const payload = { user: { id: user.id } };
    const token = sign(payload, jwtSecret, { expiresIn: '1h' });

    // Sending the token as a response
    return res.json({ message: 'Login successful', token });
  } 
  catch (error) {
    const err = error as Error; // Explicitly casting the error to Error
    return handleError(err, res);
  }
};