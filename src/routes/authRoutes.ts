import { Router } from 'express';
import { signup, login } from '../controllers/authController';

// Creating a new Router instance
const router = Router();

// Defining routes and their handlers
router.post('/signup', signup);
router.post('/login', login);

// Exporting the router to be used in other parts of the application
export default router;