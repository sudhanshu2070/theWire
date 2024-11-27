import { Router } from 'express';
import { getContacts, addContact, deleteContact } from '../controllers/contactController';
import auth from '../middlewares/auth'; // Import the auth middleware

// Creating a new Router instance
const router = Router();

// Defining routes and their handlers
router.get('/contacts', getContacts); // Route to get contacts
router.post('/contacts', auth, addContact); // Route to add a contact with authentication
router.delete('/contacts/:id', auth, deleteContact); // Route to delete a contact with authentication

// Exporting the router to be used in other parts of the application
export default router;