"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
// Creating a new Router instance
const router = (0, express_1.Router)();
// Defining routes and their handlers
router.post('/signup', authController_1.signup);
router.post('/login', authController_1.login);
// Exporting the router to be used in other parts of the application
exports.default = router;
