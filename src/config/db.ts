import mongoose, { ConnectOptions } from 'mongoose';

// creating a database connection instance
const connectDb = async (uri: string) => {
  try{
  const conn = await mongoose.createConnection(uri).asPromise();

  console.log("DB readyState:", conn.readyState);
  
  if(uri === process.env.AUTH_DB_URI){
    console.log('Auth Database connected');
  }
  else if(uri === process.env.CONTACTS_DB_URI){
    console.log('Contact save/get Database connected');
  }
  
  return conn;
  }
  catch(err){
    console.log(err);
    throw new Error(`Could not connect to the database: ${uri}`);
  }
};

export default connectDb;