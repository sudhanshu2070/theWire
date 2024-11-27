import { Schema, model, Document, Connection } from 'mongoose';

// Defining an interface for the schema
interface IAuthContact extends Document {
  username: string;
  email: string;
  password: string;
  name?: string;
  number?: string;
}

// Defining the schema
const AuthContactSchema = new Schema<IAuthContact>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  number: { type: String },
});

// Creating and exporting the model
const createAuthContactModel = (conn: Connection) =>
  conn.model<IAuthContact>('auth_contacts', AuthContactSchema);

export default createAuthContactModel;