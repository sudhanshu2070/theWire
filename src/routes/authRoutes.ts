import { Router } from 'express';
import { signup, login } from '../controllers/authController';
import CustomError from '../utils/customError'; 

// Creating a new Router instance
const router = Router();

// Defining routes and their handlers
router.post('/signup', signup);
router.post('/login', login);

// Catch unsupported HTTP methods for the '/login' and '/signup' routes
router.all('/login', (req, res, next) => {
    next(new CustomError('Method Not Allowed', 405)); // Throw custom error for invalid method
});
router.all('/signup', (req, res, next) => {
    next(new CustomError('Method Not Allowed', 405)); // Throw custom error for invalid method
});

// Exporting the router to be used in other parts of the application
export default router;