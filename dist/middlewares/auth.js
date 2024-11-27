"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_1 = __importDefault(require("../config/jwt"));
// Middleware function
const auth = (req, res, next) => {
    // Get the token from the header
    console.log("headers", req.headers);
    const token = req.header('x-auth-token');
    console.log("token:", token);
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        // Verify the token
        const decoded = (0, jsonwebtoken_1.verify)(token, jwt_1.default);
        // Attach the user to the request
        req.body.user = decoded.user;
        next(); // Continue to the next middleware or route handler
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
exports.default = auth;
