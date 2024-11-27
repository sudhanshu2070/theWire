"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
; // #SOS (keep this at top)
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const AuthContact_1 = __importDefault(require("../models/AuthContact"));
const jwt_1 = __importDefault(require("../config/jwt"));
const db_1 = __importDefault(require("../config/db"));
dotenv_1.default.config();
// Create connection instance
const authDbURI = process.env.AUTH_DB_URI;
const authContactDbConnection = (0, db_1.default)(authDbURI);
// Create AuthContact model
const AuthContact = async () => {
    const conn = await authContactDbConnection;
    return (0, AuthContact_1.default)(conn);
};
// Signup controller
const signup = async (req, res) => {
    const { username, email, password, name, number } = req.body;
    try {
        // Check if user already exists
        const AuthContactModel = await AuthContact();
        console.log("AuthContactModel:", AuthContactModel);
        let user = await AuthContactModel.findOne({ email });
        if (user)
            return res.status(400).json({ msg: 'User already exists' });
        // Hash the password
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const hashedPassword = await (0, bcryptjs_1.hash)(password, salt);
        // Create new user instance
        user = new AuthContactModel({
            username,
            email,
            password: hashedPassword,
            name,
            number,
        });
        // Save the user to the database
        await user.save();
        return res.status(201).json({ msg: 'User registered successfully' });
    }
    catch (error) {
        const err = error; // Explicitly casting the error to Error
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};
exports.signup = signup;
// Login controller
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log("u name:" + username);
        console.log("u pass:" + password);
        // Check if user exists
        const AuthContactModel = await AuthContact();
        console.log("AuthContactModel:", AuthContactModel);
        const user = await AuthContactModel.findOne({ username });
        console.log("user:", user);
        if (!user) {
            console.log('Invalid credentials - user not found');
            return res.status(400).json({ msg: "User doesn't exist" });
        }
        // Compare the password
        const isMatch = await (0, bcryptjs_1.compare)(password, user.password);
        console.log("password:", password);
        console.log("user password:", user.password);
        console.log("isMatch:", isMatch);
        if (!isMatch) {
            console.log('Invalid credentials - password mismatch');
            return res.status(400).json({ msg: 'Invalid credentials 121' });
        }
        // Create JWT payload and sign the token
        const payload = { user: { id: user.id } };
        const token = (0, jsonwebtoken_1.sign)(payload, jwt_1.default, { expiresIn: '1h' });
        // Send the token as a response
        const response = { message: 'Login successful', token123: token };
        console.log('Response:', response); // Debugging
        return res.json(response);
    }
    catch (error) {
        const err = error; // Explicitly casting the error to Error
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};
exports.login = login;
