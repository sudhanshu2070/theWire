"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// creating a database connection instance
const connectDb = async (uri) => {
    try {
        const conn = await mongoose_1.default.createConnection(uri).asPromise();
        console.log("DB readyState:", conn.readyState);
        if (uri === process.env.AUTH_DB_URI) {
            console.log('Auth Database connected');
        }
        else if (uri === process.env.CONTACTS_DB_URI) {
            console.log('Contact save/get Database connected');
        }
        return conn;
    }
    catch (err) {
        console.log(err);
        throw new Error(`Could not connect to the database: ${uri}`);
    }
};
exports.default = connectDb;
