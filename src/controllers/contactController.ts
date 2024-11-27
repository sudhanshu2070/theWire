import dotenv from 'dotenv';// #SOS (keep this at top)
import { Request, Response } from 'express';
import connectDb from '../config/db';
import createContactModel from '../models/Contact';

dotenv.config();

// Create connection instance
const contactsDbURI = process.env.CONTACTS_DB_URI as string;
const contactsDbConnection = connectDb(contactsDbURI);

// Create Contact model
const Contact = async () => {
  const conn = await contactsDbConnection;
  return createContactModel(conn);
};

// Get contacts, optionally filtered by name
export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const nameToSearch = req.query.name as string | undefined;
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
      res.status(404).json({ message: 'Contact(s) not found' });
    }
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Server error');
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
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).send('Server error');
  }
};

// Delete a contact by ID
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const ContactModel = await Contact();

    const result = await ContactModel.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact' });
  }
};