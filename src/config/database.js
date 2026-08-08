import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from './logger.js';
import { seedDatabase } from '../scripts/seed.js';

export const connectDB = async (retries = 5, delay = 5000) => {
  const uri = env.mongoUri;
  
  if (!uri) {
    logger.error('MONGODB_URI is not defined in environment variables.');
    process.exit(1);
  }

  while (retries > 0) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      logger.info(`MongoDB Connected: ${conn.connection.host}`);
      
      // Seed database automatically for the MVP
      await seedDatabase();
      return;
    } catch (error) {
      retries -= 1;
      logger.error(`Error connecting to MongoDB: ${error.message}. Retries left: ${retries}`);
      if (retries === 0) {
        logger.error('Could not connect to MongoDB after multiple attempts. Exiting...');
        process.exit(1);
      }
      // Wait before retrying
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

// Graceful shutdown handling
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed due to application termination');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed due to application termination');
  process.exit(0);
});
