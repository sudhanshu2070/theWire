"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Defining the schema
const AuthContactSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    number: { type: String },
});
// Creating and exporting the model
const createAuthContactModel = (conn) => conn.model('auth_contacts', AuthContactSchema);
exports.default = createAuthContactModel;
