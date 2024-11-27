import { Schema, model, Document, Connection } from 'mongoose';

// Defining an interface for the save/get Contact schema
interface IContact extends Document {
  name: string;
  phone: string;
  email: string;
  address: string;
  jobTitle: string;
  company: string;
  dob: string;
  quote: string;
}

// Defining the save/get schema with types
const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  dob: { type: String, required: true },
  quote: { type: String, required: true },
});

// Creating and exporting the model
const createContactModel = (conn: Connection) =>
  conn.model<IContact>('contacts', ContactSchema);

export default createContactModel;
