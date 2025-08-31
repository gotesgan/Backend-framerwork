import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../../config/env.js';

const JWT_SECRET = env.jwtSecret;
const JWT_EXPIRY = '1h'; // adjust as needed

// --- JWT Functions ---
// payload can include user id, email, role, etc.
// expiresIn can be adjusted as needed
// default is 1 hour
// modify as per your requirements
//bycrypt for password hashing
//jwt for token generation and verification
export const signToken = (payload, expiresIn = JWT_EXPIRY) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

// --- Bcrypt Functions ---
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
