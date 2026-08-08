import cors from 'cors';
import { env } from './env.js';

export const corsConfig = cors({
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
});
