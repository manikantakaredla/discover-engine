import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { env } from './config/env.js';
import { corsConfig } from './config/cors.js';
import { helmetConfig } from './config/helmet.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { mongoSanitize } from './security/sanitize.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';
import { accessLogStream } from './config/logger.js';

import routes from './routes/index.js';

const app = express();

// 1. Security Middlewares
app.use(helmetConfig);
app.use(corsConfig);
app.use(mongoSanitize());
app.use(apiLimiter);

// 2. Standard Middlewares
app.use(express.json({ limit: '10kb' })); // Body parser, reading data from body into req.body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(compression());

// 3. Logging
if (env.logLevel !== 'test') {
  app.use(morgan('combined', { stream: accessLogStream }));
  app.use(morgan('dev')); // Also log to console in dev
}

// 4. Routes
app.use(env.apiPrefix, routes);

// Base route for health check
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Discover Engine API is running' });
});

// 5. Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
