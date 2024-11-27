import dotenv from 'dotenv';;// #SOS (keep this at top)
import { Request, Response } from 'express';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import createAuthContactModel from '../models/AuthContact';
import jwtSecret from '../config/jwt';
import connectDb from '../config/db';

dotenv.config();

// Create connection instance
const authDbURI = process.env.AUTH_DB_URI as string;

const authContactDbConnection = connectDb(authDbURI);

// Create AuthContact model
const AuthContact = async () => {
  const conn = await authContactDbConnection;
  return createAuthContactModel(conn);
};

// Signup controller
export const signup = async (req: Request, res: Response): Promise<Response> => {
  
  const { username, email, password, name, number } = req.body;

  try {
    // Check if user already exists

    const AuthContactModel = await AuthContact();
    console.log("AuthContactModel:", AuthContactModel);

    let user = await AuthContactModel.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Hash the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Create new user instance
    user = new AuthContactModel({
      username,
      email,
      password: hashedPassword,
      name,
      number,
    });

    // Save the user to the database
    await user.save();
    return res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    const err = error as Error; // Explicitly casting the error to Error
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

// Login controller
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  try {
    console.log("u name:"+ username); 
    console.log("u pass:" + password);
    // Check if user exists
    
    const AuthContactModel = await AuthContact();

    console.log("AuthContactModel:", AuthContactModel);

    const user = await AuthContactModel.findOne({ username });
    console.log("user:", user);
    
    if (!user) {
      console.log('Invalid credentials - user not found'); 
      return res.status(400).json({ msg: "User doesn't exist" });
    }
    // Compare the password
    const isMatch = await compare(password, user.password);
    console.log("password:", password);

    console.log("user password:", user.password);
    console.log("isMatch:", isMatch);
    
    if (!isMatch) {
      console.log('Invalid credentials - password mismatch'); 
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT payload and sign the token
    const payload = { user: { id: user.id } };
    const token = sign(payload, jwtSecret, { expiresIn: '1h' });

    // Send the token as a response

    const response = { message: 'Login successful', token123: token };

    console.log('Response:', response); // Debugging

    return res.json(response);

  } catch (error) {
    const err = error as Error; // Explicitly casting the error to Error
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};