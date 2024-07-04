import jwt from 'jsonwebtoken';
import generateRandomString from './genereateRandomString.js';

export const generateToken = (user, expiresIn) =>
  jwt.sign(user ?? { username: generateRandomString() }, process.env.JWT_SECRET, { expiresIn });
