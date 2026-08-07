import jwt from 'jsonwebtoken';
import { env } from './env.js';

export const jwtConfig = {
  secret: env.jwtSecret,
  expiresIn: env.jwtExpiry,
};
