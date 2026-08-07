import cors from 'cors';
import { env } from './env.js';

export const corsConfig = cors({
  origin: env.frontendUrl,
  credentials: true,
  optionsSuccessStatus: 200,
});
