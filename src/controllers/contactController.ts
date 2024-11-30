import dotenv from 'dotenv';// #SOS (keep this at top)
import { Request, Response } from 'express';
import connectDb from '../config/db';
import createContactModel from '../models/Contact';
import CustomError from '../utils/customError';  // Importing custom error handler

dotenv.config();

// Creatign a connection instance
const contactsDbURI = process.env.CONTACTS_DB_URI as string;
const contactsDbConnection = connectDb(contactsDbURI);

// Creating a Contact model
const Contact = async () => {
  const conn = await contactsDbConnection;
  return createContactModel(conn);
};

// Helper function to handle server errors
const handleServerError = (res: Response, message: string) => {
  console.error(message);
  return res.status(500).json({ message: 'Server error, please try again later, sent from above and beyond' });
};


// Get contacts, optionally filtered by name
export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    //const nameToSearch = req.body.name as string | undefined; // Get `name` from the request body
    const nameToSearch = req.query.name as string | undefined; // Get name from the url(?name=deep)
    let contacts;

    const ContactModel = await Contact();

    if (nameToSearch) {
      contacts = await ContactModel.find({ name: nameToSearch });
    } else {
      contacts = await ContactModel.find();
    }

    if (contacts && contacts.length > 0) {
      res.json(contacts);
    } else {
      throw new CustomError('No contacts found', 404); // Using CustomError for better error handling
    }
  } 
  catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    } else {
      handleServerError(res, 'Error fetching contacts');
    }
  }
};


// Add a new contact
export const addContact = async (req: Request, res: Response): Promise<void> => {
  const { name, phone, email, address, jobTitle, company, dob, quote } = req.body;

  try {
    const ContactModel = await Contact();

    const newContact = new ContactModel({
      name,
      phone,
      email,
      address,
      jobTitle,
      company,
      dob,
      quote,
    });

    await newContact.save();
    res.status(201).json(newContact);
  } 
  catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    } else {
      handleServerError(res, 'Error saving contact');
    }
  }
};


// Delete a contact by ID
export const deleteContact = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Contact ID is required' });
  }

  try {
    const ContactModel = await Contact();
    const result = await ContactModel.findByIdAndDelete(id);

    if (result) {
      return res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      throw new CustomError('Contact not found', 404); // Handle contact not found
    }
  } 
  catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return handleServerError(res, 'Error deleting contact');
    }
  }
};