"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const auth_1 = __importDefault(require("../middlewares/auth")); // Import the auth middleware
// Creating a new Router instance
const router = (0, express_1.Router)();
// Defining routes and their handlers
router.get('/contacts', contactController_1.getContacts); // Route to get contacts
router.post('/contacts', auth_1.default, contactController_1.addContact); // Route to add a contact with authentication
router.delete('/contacts/:id', auth_1.default, contactController_1.deleteContact); // Route to delete a contact with authentication
// Exporting the router to be used in other parts of the application
exports.default = router;
