import { Router } from 'express';
import { getContacts, addContact, deleteContact } from '../controllers/contactController';
import auth from '../middlewares/auth'; // Importing the auth middleware
import CustomError from '../utils/customError'; 

// Creating a new Router instance
const router = Router();

// Defining routes and their handlers
router.get('/getContacts', getContacts); // Route to get contacts
//router.post('/saveContacts', addContact); // Route to add a contact
router.post('/saveContacts', auth, addContact); // Route to add a contact with authentication
router.delete('/deleteContact/:id', auth, deleteContact); // Route to delete a contact with authentication

// Handling unsupported method types
router.use('/getContacts', (req, res, next) => {
  if (req.method !== 'GET') {
    return next(new CustomError('Method not allowed. Please use GET for this route.', 405));
  }
  next();
});

router.use('/saveContacts', (req, res, next) => {
  if (req.method !== 'POST') {
    return next(new CustomError('Method not allowed. Please use POST for this route.', 405));
  }
  next();
});

router.use('/deleteContact/:id', (req, res, next) => {
  if (req.method !== 'DELETE') {
    return next(new CustomError('Method not allowed. Please use DELETE for this route.', 405));
  }
  next();
});

// Exporting the router to be used in other parts of the application
export default router;