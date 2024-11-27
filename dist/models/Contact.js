"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Defining the save/get schema with types
const ContactSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    dob: { type: String, required: true },
    quote: { type: String, required: true },
});
// Creating and exporting the model
const createContactModel = (conn) => conn.model('contacts', ContactSchema);
exports.default = createContactModel;
