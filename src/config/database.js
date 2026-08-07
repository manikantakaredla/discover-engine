import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { env } from './env.js';
import { logger } from './logger.js';
import { seedDatabase } from '../scripts/seed.js';

let mongoServer;

export const connectDB = async () => {
  try {
    let uri = env.mongoUri;
    
    // For Hackathon MVP: Always use MongoMemoryServer to guarantee zero-friction setup
    // unless explicitly disabled or overridden.
    if (!uri || uri.includes('localhost') || process.env.USE_MEMORY_DB !== 'false') {
      logger.info('Starting In-Memory MongoDB Server for MVP...');
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
    }

    const conn = await mongoose.connect(uri);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed database automatically for the MVP
    await seedDatabase();

  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
