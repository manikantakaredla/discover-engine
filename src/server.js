import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/database.js';
import { logger } from './config/logger.js';

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...', err);
  process.exit(1);
});

// Connect to Database
connectDB();

const server = app.listen(env.port, () => {
  logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${env.port}`);
});

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! Shutting down...', err);
  server.close(() => {
    process.exit(1);
  });
});
