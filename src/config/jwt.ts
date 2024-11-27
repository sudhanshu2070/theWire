require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET as string;

export default jwtSecret;