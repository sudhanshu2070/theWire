import mongoose, { ConnectOptions } from 'mongoose';
import CustomError from '../utils/customError'; 

// creating a database connection instance
const connectDb = async (uri: string) => {
  try{
  
  console.log(`[${new Date().toISOString()}] Attempting to connect to the database...`);
  
  const conn = await mongoose.createConnection(uri).asPromise();

  console.log(`[${new Date().toISOString()}] DB readyState: ${conn.readyState}`);
  
  if(uri === process.env.AUTH_DB_URI){
    console.log(`[${new Date().toISOString()}] Auth Database connected`);
  }
  else if(uri === process.env.CONTACTS_DB_URI){
    console.log(`[${new Date().toISOString()}] Contact save/get Database connected`);
  }
  
  return conn; // Returning the connection instance
  }
  catch(err){
    console.error(`[${new Date().toISOString()}] Error connecting to the database: ${uri}`, err);
    throw new CustomError(`Could not connect to the database: ${uri}`, 500);
  }
};

export default connectDb;