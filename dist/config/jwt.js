"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
exports.default = jwtSecret;
