"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Logging the error stack trace
    res.status(500).send('Something broke in the middleware!'); // Sending a error message
};
exports.default = errorHandler;
