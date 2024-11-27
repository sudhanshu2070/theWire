"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.addContact = exports.getContacts = void 0;
const dotenv_1 = __importDefault(require("dotenv")); // #SOS (keep this at top)
const db_1 = __importDefault(require("../config/db"));
const Contact_1 = __importDefault(require("../models/Contact"));
dotenv_1.default.config();
// Create connection instance
const contactsDbURI = process.env.CONTACTS_DB_URI;
const contactsDbConnection = (0, db_1.default)(contactsDbURI);
// Create Contact model
const Contact = async () => {
    const conn = await contactsDbConnection;
    return (0, Contact_1.default)(conn);
};
// Get contacts, optionally filtered by name
const getContacts = async (req, res) => {
    try {
        const nameToSearch = req.query.name;
        let contacts;
        const ContactModel = await Contact();
        if (nameToSearch) {
            contacts = await ContactModel.find({ name: nameToSearch });
        }
        else {
            contacts = await ContactModel.find();
        }
        if (contacts && contacts.length > 0) {
            res.json(contacts);
        }
        else {
            res.status(404).json({ message: 'Contact(s) not found' });
        }
    }
    catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).send('Server error');
    }
};
exports.getContacts = getContacts;
// Add a new contact
const addContact = async (req, res) => {
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
        console.error('Error saving contact:', error);
        res.status(500).send('Server error');
    }
};
exports.addContact = addContact;
// Delete a contact by ID
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const ContactModel = await Contact();
        const result = await ContactModel.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Contact deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Contact not found' });
        }
    }
    catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Error deleting contact' });
    }
};
exports.deleteContact = deleteContact;
